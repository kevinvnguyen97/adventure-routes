"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
} from "@chakra-ui/react";
import { toaster } from "@utils/toaster";

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => {
          let toastColor;
          switch (toast.type) {
            case "error":
              toastColor = "red/60";
              break;
            case "success":
              toastColor = "green/60";
              break;
            case "warning":
              toastColor = "yellow/60";
              break;
            default:
              toastColor = "blue/60";
              break;
          }
          return (
            <Toast.Root
              width={{ md: "sm" }}
              bgColor={toastColor}
              backdropFilter="blur(5px)"
            >
              {toast.type === "loading" ? (
                <Spinner size="sm" color="blue.solid" />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
              )}
              {toast.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};
