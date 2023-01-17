import { Nav } from "@/components/layout/nav";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { CommandDialog } from "vendor/cmdk/DialogWithClassnames";
import Meta from "./meta";
import { Command } from "cmdk";
import { Brand, make as brand } from "ts-brand";
import {
  useHotkeys,
  HotkeyCallback,
  useHotkeysContext,
} from "react-hotkeys-hook";

type PageKey = Brand<string, "pageKey">;
const PageKey = brand<PageKey>();

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
  const [pages, setPages] = useState<PageKey[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { enableScope, disableScope } = useHotkeysContext();

  const handleOpenAddModal = useCallback(() => {
    setModalOpen(true);
    enableScope("addModal");
  }, [setModalOpen, enableScope]);

  const handleCloseAddModal = useCallback(() => {
    setModalOpen(false);
    disableScope("addModal");
    router.push("/");
  }, [setModalOpen, disableScope, router]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      handleOpenAddModal();
    } else {
      handleCloseAddModal();
    }
  }, []);

  useEffect(() => {
    if (router.query.globalmodal === "add-url" && noModalsOpen) {
      handleOpenAddModal();
    }
  }, [router.query.globalmodal]);

  useHotkeys(
    "meta+k",
    () => {
      handleOpenAddModal();
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    },
    [handleOpenAddModal],
  );

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
      <CommandDialog
        open={addModalOpen}
        onOpenChange={handleOpenChange}
        dialogOverlayClassName="fixed inset-0 bg-black/50"
        dialogContentClassName="fixed top-1/2 left-1/2 mx-auto w-full -translate-y-1/2 -translate-x-1/2 rounded bg-zinc-50 p-2 shadow dark:bg-zinc-800 md:w-96"
      >
        <Command.Input
          value={search}
          onValueChange={(newValue) => setSearch(newValue)}
          className="w-full dark:bg-zinc-700"
        />
        <Command.List></Command.List>
      </CommandDialog>
    </>
  );
}
