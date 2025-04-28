"use client";

import { useRouter, usePathname } from "next/navigation";
import * as React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
} from "@mui/material";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";

export const SideDrawer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="primary" />,
      path: "/",
    },
    {
        text: "My Categories",
        icon: <SubjectOutlined color="primary" />,
        path: "/notes/category",
      },
    // {
    //   text: "Create Notes",
    //   icon: <AddCircleOutlineOutlined color="primary" />,
    //   path: "/notes/create",
    // },
    
  ];
  const drawerWidth = 280;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />

      {/* list / links */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => router.push(item.path)}
            sx={{
              backgroundColor: pathname === item.path && "#f4f4f4",
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};