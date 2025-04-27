import { Icon } from "@/components/ui/icon";
import { MenuItem } from "@/types/sidebar";
import Link from "next/link";

export const SidebarMenuItem = ({ item }: { item: MenuItem }) => {
  if (item.children) {
    return (
      <div className="collapse group">
        <input
          type="checkbox"
          className="peer"
          aria-label={`${item.title} menu`}
        />
        <div className="collapse-title flex items-center gap-2 rounded-lg hover:bg-base-200">
          {item.icon && <Icon icon={item.icon} className="h-4 w-4" />}
          <span className="grow">{item.title}</span>
          {item.badge && (
            <span
              className={`badge badge-sm badge-${
                item.badge.variant || "primary"
              }`}
            >
              {item.badge.text}
            </span>
          )}
          <Icon
            icon="lucide:chevron-right"
            className="h-4 w-4 transition-transform group-focus:rotate-90"
          />
        </div>
        <div className="collapse-content">
          {item.children.map((child, index) => (
            <SidebarMenuItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  }

  const content = (
    <>
      {item.icon && <Icon icon={item.icon} className="h-4 w-4" />}
      <span className="grow">{item.title}</span>
      {item.badge && (
        <span
          className={`badge badge-sm badge-${item.badge.variant || "primary"}`}
        >
          {item.badge.text}
        </span>
      )}
    </>
  );

  return item.isExternal ? (
    <a
      href={item.path}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-lg p-2 hover:bg-base-200"
    >
      {content}
    </a>
  ) : (
    <Link
      href={item.path || "#"}
      className="flex items-center gap-2 rounded-lg p-2 hover:bg-base-200"
    >
      {content}
    </Link>
  );
};
