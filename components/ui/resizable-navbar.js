//componnents/ui/resizable-navbar.js
"use client";;
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";


export const Navbar = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-3 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child)}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(102,102,102,0.12), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(102,102,102,0.08), 0 0 4px rgba(102,102,102,0.1), 0 16px 68px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "900px",
        fontFamily: "'Space Mono', monospace",
      }}
      className={cn(
        "relative z-60 mx-auto border border-[#666666] hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-4 lg:flex",
        visible && "bg-[#111111]/80",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick
}) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      style={{ fontFamily: "'Space Mono', monospace" }}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-0 text-sm font-medium text-[#A1A1AA] transition duration-200 hover:text-white lg:flex lg:space-x-2",
        className
      )}>
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-2 py-2 text-[#A1A1AA] hover:text-white transition-colors"
          key={`link-${idx}`}
          href={item.link}>
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full border border-[#666666] bg-transparent" />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(102,102,102,0.12), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(102,102,102,0.08), 0 0 4px rgba(102,102,102,0.1), 0 16px 68px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "8px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "border border-[#666666] bg-[#111111]/60",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className
}) => {
  return (
    <div
      className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ fontFamily: "'Space Mono', monospace" }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg border border-[#666666] bg-[#111111] px-26 py-8 shadow-[0_0_24px_rgba(0,0,0,0.3),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(102,102,102,0.08),0_0_4px_rgba(102,102,102,0.1),0_16px_68px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.1)_inset]",
            className
          )}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick
}) => {
  return isOpen ? (
    <IconX className="text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center rounded-full space-x-2 px-2 py-1 text-sm font-normal text-black">
      <img
        src="/profile.png"
        alt="logo"
        width={30}
        height={30} />
      <span
        className="font-medium text-white"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >Viraj bane</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "dark",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md button text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-white text-black shadow-[0_0_24px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(102,102,102,0.08),0_0_4px_rgba(102,102,102,0.1),0_16px_68px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.1)_inset]",
    secondary: "bg-transparent text-white shadow-none border border-[#666666]",
    dark: "bg-[#111111] text-white border border-[#666666] shadow-[0_0_24px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(102,102,102,0.08),0_0_4px_rgba(102,102,102,0.1),0_16px_68px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-white to-[#A1A1AA] text-black shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      style={{ fontFamily: "'Space Mono', monospace" }}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}>
      {children}
    </Tag>
  );
};