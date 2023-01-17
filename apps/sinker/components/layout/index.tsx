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
import { ListPlus } from "lucide-react";

type PageKey = Brand<string, "pageKey">;
const PageKey = brand<PageKey>();

const PageKeys = {
  addUrl: PageKey("addUrl"),
} as const;

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
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const noModalsOpen = useMemo(() => !commandPaletteOpen, [commandPaletteOpen]);
  const [pages, setPages] = useState<PageKey[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { enableScope, disableScope } = useHotkeysContext();
  const page = pages[pages.length - 1] || undefined;

  const handleOpenCommandPalette = useCallback(() => {
    setCommandPaletteOpen(true);
    enableScope("addModal");
  }, [setCommandPaletteOpen, enableScope]);

  const handleOpenAddModal = useCallback(() => {
    handleOpenCommandPalette();
    setPages((pages) => [...pages, PageKeys.addUrl]);
  }, [handleOpenCommandPalette]);

  const handleCloseCommandPalette = useCallback(() => {
    setCommandPaletteOpen(false);
    disableScope("addModal");
    setPages([]);
    router.push("/");
  }, [setCommandPaletteOpen, disableScope, router]);

  const handleCommandPaletteVisibleChange = useCallback((open: boolean) => {
    if (open) {
      handleOpenCommandPalette();
    } else {
      handleCloseCommandPalette();
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
      handleOpenCommandPalette();
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    },
    [handleOpenCommandPalette],
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
        open={commandPaletteOpen}
        onOpenChange={handleCommandPaletteVisibleChange}
        dialogOverlayClassName="fixed inset-0 bg-black/50"
        dialogContentClassName="font-sans fixed top-1/2 left-1/2 mx-auto w-full -translate-y-1/2 -translate-x-1/2 rounded bg-zinc-50 shadow dark:bg-zinc-800 p-4 md:w-128"
      >
        {page === PageKeys.addUrl ? (
          <header className=" p-2">
            <h1>Add a URL</h1>
          </header>
        ) : null}
        <Command.Input
          value={search}
          onValueChange={(newValue) => setSearch(newValue)}
          className="w-full rounded p-4 font-mono dark:bg-zinc-700"
        />
        {page == null ? (
          <Command.List>
            <>
              <Command.Empty>
                All those commands lost, like tears in rain...
              </Command.Empty>
              <Command.Item
                value="add url"
                className="flex items-center justify-start rounded border p-2 dark:bg-zinc-700 dark:aria-selected:border-zinc-400 dark:aria-selected:bg-zinc-600"
                onSelect={handleOpenAddModal}
              >
                <ListPlus />
                <span>Add URL</span>
              </Command.Item>
            </>
          </Command.List>
        ) : null}
        {page === PageKeys.addUrl ? (
          <section className="p-2">
            Paste a URL to a video, channel, or playlist
          </section>
        ) : null}
      </CommandDialog>
    </>
  );
}
