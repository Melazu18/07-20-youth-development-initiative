import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { localizedPath } from "@/i18n/localizedPath";

type Props = Omit<LinkProps, "to"> & { to: string };

export const LocalizedLink = forwardRef<HTMLAnchorElement, Props>(
  ({ to, ...props }, ref) => {
    return <Link ref={ref} to={localizedPath(to)} {...props} />;
  },
);

LocalizedLink.displayName = "LocalizedLink";
