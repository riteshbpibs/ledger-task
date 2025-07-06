export const config = {
  runtime: 'edge',
}

let transactions = []

export default async function handler(req) {
  if (req.method === 'GET') {
    return new Response(JSON.stringify(transactions), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (req.method === 'POST') {
    const body = await req.json()
    const newTx = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      ...body,
    }
    transactions.push(newTx)
    return new Response(JSON.stringify(newTx), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response('Method Not Allowed', { status: 405 })
}
