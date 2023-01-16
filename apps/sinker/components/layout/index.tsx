import { Nav } from "@/components/layout/nav";
import { AddVideo } from "@/components/modals/addVideo";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Meta from "./meta";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const router = useRouter();
  const [addModalOpen, setModalOpen] = useState(false);
  const noModalsOpen = useMemo(() => !addModalOpen, [addModalOpen]);

  const handleOpenChange = useCallback((open: boolean) => {
    setModalOpen(open);
    router.push("/");
  }, []);

  useEffect(() => {
    if (router.query.globalmodal === "add-url" && noModalsOpen) {
      setModalOpen(true);
    }
  }, [router.query.globalmodal]);

  return (
    <>
      <Meta {...meta} />
      <div className="w-full bg-white/0">
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="font-display flex items-center text-2xl">
            <p>Sinker</p>
          </Link>
          <Nav />
        </div>
      </div>
      <main className="flex w-screen flex-col items-center justify-center py-32">
        {children}
      </main>
      <Dialog.Root open={addModalOpen} onOpenChange={handleOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 mx-auto w-full -translate-y-1/2 -translate-x-1/2 rounded bg-zinc-50 p-2 shadow dark:bg-zinc-800 md:w-96">
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
    </>
  );
}
