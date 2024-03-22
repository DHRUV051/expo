"use client";
import Image from "next/image";
import Logo from "../../public/sk_logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import axios from "axios";
import { MdMenu } from "react-icons/md";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`
      );
      console.log("response", response);
      if (response.data.statusCode === 200) {
        console.log("token", localStorage.getItem("token"));
        localStorage.removeItem("token", null);
        localStorage.removeItem("role", null);
        
return router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar">
        <Image src={Logo} alt="sk_logo" width={60} height={60} />

        {localStorage.getItem("role") === "Admin" && (
          <div className="desktopNavbar">
            <ul className="list">
              <li className="list-item">
                {localStorage.getItem("role") === "Admin" && (
                  <Link
                    href={"/dashboard"}
                    className={clsx(pathname === "/dashboard" ? "active" : "")}
                  >
                    Employee
                  </Link>
                )}
              </li>
              <li className="list-item">
                <Link
                  href={"/dashboard/student"}
                  className={clsx(
                    pathname === "/dashboard/student" ? "active" : ""
                  )}
                >
                  Student
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* <div className="mobileNavbar">
          <Menu>
            <MenuHandler>
              <Button variant="text" className="p-2 bg-none">
                <MdMenu size={24} />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem color="black">
                <Link
                  href={"/admin"}
                  className={clsx(pathname === "/admin" ? "active" : "")}
                >
                  Employee
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href={"/admin/student"}
                  className={clsx(
                    pathname === "/admin/student" ? "active" : ""
                  )}
                >
                  Student
                </Link>
              </MenuItem>
              <MenuItem>
                <Button onClick={() => handleLogout()}>Log Out</Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </div> */}

        {localStorage.getItem("role") === "Admin" && (
          <div className="mobileNavbar">
            <button onClick={openDrawer}>
              <MdMenu size={30} />
            </button>
            <Drawer
              size={350}
              placement="right"
              className="w-full"
              open={open}
              onClose={closeDrawer}
            >
              <div className="mb-2 flex items-center justify-between p-4">
                <Typography variant="h5" color="blue-gray">
                  Menu
                </Typography>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={closeDrawer}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </div>
              <List>
                <ListItem className="">
                  <Link
                    href={"/dashboard"}
                    className={clsx(pathname === "/dashboard" ? "active" : "")}
                  >
                    Employee
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={"/dashboard/student"}
                    className={clsx(
                      pathname === "/dashboard/student" ? "active" : ""
                    )}
                  >
                    Student
                  </Link>
                </ListItem>
                <ListItem>
                  <Button className="" onClick={() => handleLogout()}>
                    Log Out
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </div>
        )}

        {localStorage.getItem("role") === "Front Desk" ||
          (localStorage.getItem("role") === "Representative" && (
            <Button className="" onClick={() => handleLogout()}>
              Log Out
            </Button>
          ))}

        {localStorage.getItem("role") === "Admin" && (
          <Button className="desktopNavbar" onClick={() => handleLogout()}>
            Log Out
          </Button>
        )}
      </div>
    </>
  );
};

export default Header;
