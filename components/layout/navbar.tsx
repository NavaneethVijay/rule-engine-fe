"use client";

import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function MainNavbar() {
  return (
    <header className="flex h-16 items-center px-4 bg-white shadow-sm border-b border-border fixed top-0 left-64 right-0">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-1.5 pr-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="@aliciakoch" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm font-medium">Alicia Koch</span>
              <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Alicia Koch</p>
                <p className="text-xs leading-none text-muted-foreground">
                  alicia@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>New Team</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav className="flex items-center space-x-6 ml-6">
        <Link
          href="#"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Overview
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Customers
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Products
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </Link>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[300px] pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="pl-1.5 pr-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="@aliciakoch" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Alicia Koch
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    alicia@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>New Team</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
