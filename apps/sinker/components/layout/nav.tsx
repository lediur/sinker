import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Plus } from "lucide-react";

/**
 * enforce defined `href` for NextLink
 */
type NavLinkProps = NavigationMenu.NavigationMenuLinkProps & {
  href: string;
  as?: string;
};

const NavLink = ({ href, as, ...props }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href} as={as} passHref legacyBehavior>
      <NavigationMenu.Link active={isActive} {...props} />
    </NextLink>
  );
};

export const Nav = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavLink
          href="/?globalmodal=add-url"
          as="/add"
          className="flex items-center justify-start rounded bg-sky-500 p-1 px-2 hover:bg-sky-700"
        >
          <Plus className="inline h-4 w-4" />
          <span>Add URL</span>
        </NavLink>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
);
