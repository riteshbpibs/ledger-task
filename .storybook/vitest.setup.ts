import * as projectAnnotations from "./preview";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";

setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
