import { z } from "zod";
import { mutate } from "swr";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostTransactions } from "@/api/ledger-api";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const schema = z
  .object({
    date: z.date({ required_error: "Date is required" }),
    description: z.string().min(1, "Description is required"),
    debitAccount: z.string().min(1, "Debit Account is required"),
    creditAccount: z.string().min(1, "Credit Account is required"),
    amount: z.coerce.number().positive("Amount must be a positive number"),
  })
  .refine(data => data.debitAccount !== data.creditAccount, {
    message: "Debit and Credit accounts must differ",
    path: ["creditAccount"],
  });

type FormData = z.infer<typeof schema>;

export default function TransactionForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = usePostTransactions();

  const onSubmit = async (data: FormData) => {
    const newData = {
      ...data,
      date: data.date.toISOString().split("T")[0],
    };

    mutate(
      "/transactions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (existing: any) => {
        return {
          ...existing,
          data: [...(existing?.data || []), { ...newData, id: crypto.randomUUID() }],
        };
      },
      false
    );

    try {
      await mutation.trigger(newData);
      toast.success("Transaction created");
      reset();
    } catch {
      toast.error("Failed to create transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(field.value, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-10 bg-white">
              <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

      <Input {...register("description")} placeholder="Description" />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <Input {...register("debitAccount")} placeholder="Debit Account" />
      {errors.debitAccount && <p className="text-red-500 text-sm">{errors.debitAccount.message}</p>}

      <Input {...register("creditAccount")} placeholder="Credit Account" />
      {errors.creditAccount && <p className="text-red-500 text-sm">{errors.creditAccount.message}</p>}

      <Input type="number" step="0.01" {...register("amount")} placeholder="Amount" />
      {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}

      <Button type="submit" className="bg-blue-400">Submit</Button>
    </form>
  );
}
