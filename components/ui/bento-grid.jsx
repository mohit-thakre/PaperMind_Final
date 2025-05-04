import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input bg-transaparent [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] row-span-1 flex flex-col md:mx-0 mx-3  justify-between space-y-4 rounded-xl border border-neutral-200  p-4 transition duration-200  dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-purple-100 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-purple-100/50 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
