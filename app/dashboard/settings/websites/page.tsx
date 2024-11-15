"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Save, Plus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Website = {
  website_id: string;
  name: string;
  url: string;
  created_at: string;
};

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config");
        const result = await response.json();
        if (result.success) {
          setWebsites(result.data.websites);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const saveChanges = () => {
    console.log("Saving websites:", websites);
  };

  const addNewWebsite = () => {
    const newWebsite: Website = {
      website_id: crypto.randomUUID(),
      name: "",
      url: "",
      created_at: new Date().toISOString(),
    };
    setWebsites([...websites, newWebsite]);
    console.log("Added new website:", newWebsite);
  };

  const updateWebsite = (id: string, field: keyof Website, value: string) => {
    setWebsites(
      websites.map((website) =>
        website.website_id === id ? { ...website, [field]: value } : website
      )
    );
  };

  const deleteWebsite = (id: string) => {
    const websiteToDelete = websites.find(w => w.website_id === id);
    setWebsites(websites.filter((website) => website.website_id !== id));
    console.log("Deleted website:", websiteToDelete);
  };

  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Websites</CardTitle>
        <CardDescription>Manage your website configurations</CardDescription>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => saveChanges()} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
        <Button onClick={addNewWebsite} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Website
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {websites.map((website) => (
            <TableRow key={website.website_id}>
              <TableCell>{website.website_id}</TableCell>
              <TableCell>
                <Input
                  value={website.name}
                  onChange={(e) =>
                    updateWebsite(website.website_id, "name", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  value={website.url}
                  onChange={(e) =>
                    updateWebsite(website.website_id, "url", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                {new Date(website.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteWebsite(website.website_id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}
