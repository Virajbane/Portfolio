"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function NavbarDemo() {
  const router = useRouter();
  const navItems = [
    {
      name: "About",
      link: "/About",
    },
    {
      name: "Projects",
      link: "/Project",
    },
    {
      name: "My Work",
      link: "/MyWork",
    },
    {
      name: "Achievements",
      link: "/Achievements",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBlogClick = () => {
    router.push('/Blog');
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    router.push('/ContactMe');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full">
      <Navbar >
        {/* Desktop Navigation */}
        <NavBody >
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="dark" onClick={handleBlogClick}>Blog</NavbarButton>
            <NavbarButton variant="primary" onClick={handleContactClick}>Contact me</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-white dark:text-neutral-500">
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={handleBlogClick}
                variant="primary"
                className="w-full">
                Blog
              </NavbarButton>
              <NavbarButton
                onClick={handleContactClick}
                variant="primary"
                className="w-full">
                Contact me
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}