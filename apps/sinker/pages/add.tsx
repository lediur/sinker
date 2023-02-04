import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { AddVideo } from "@/components/modals/addVideo";
import Layout from "@/components/layout";

const AddVideoModalPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenChange = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <Layout>
      <Dialog.Root open={true} onOpenChange={handleOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Add video</Dialog.Title>
            <Dialog.Description>
              <AddVideo />
            </Dialog.Description>
            <Dialog.Close>
              <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Layout>
  );
};

export default AddVideoModalPage;
