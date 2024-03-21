"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Loading from "@/componenets/globals/loading-page";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Button,
  DialogFooter,
} from "@material-tailwind/react";
import UpdateForm from "@/componenets/forms/Update-form";
import AddForm from "@/componenets/forms/Add-form";
import ViewForm from "@/componenets/ViewForm";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  // const [totalRows, setTotalRows] = useState(0);
  // const [perPage, setPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [active, setActive] = React.useState(1);

  // const getItemProps = (index) =>
  //   ({
  //     variant: active === index ? "filled" : "text",
  //     color: "gray",
  //     onClick: () => setActive(index),
  //     className: "rounded-full",
  //   } || {});

  // const next = () => {
  //   if (active === 5) return;

  //   setActive(active + 1);
  // };

  // const prev = () => {
  //   if (active === 1) return;

  //   setActive(active - 1);
  // };

  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    setOpenEdit(!openEdit);
  };

  const handleOpenDelete = (row) => {
    setSelectedRow(row);
    setOpenDelete(!openDelete);
  };

  const handleOpenView = (row) => {
    setSelectedRow(row);
    setOpenView(!openView);
  };

  const handleOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);

  //   const response = await axios.get(
  //     `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`
  //   );

  //   setData(response.data.data);
  //   setPerPage(newPerPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 1,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      grow: 1,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      grow: 2,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <div className="flex space-x-4">
              <button onClick={() => handleOpenView(row)}>
                <FaEye size={20} className="text-[rgb(102,102,102)]" />
              </button>

              <button onClick={() => handleOpenEdit(row)}>
                <MdEdit size={20} />
              </button>

              <button onClick={() => handleOpenDelete(row)}>
                <MdDelete size={20} className="text-red-500" />
              </button>
            </div>
          </>
        );
      },
      grow: 1,
    },
  ];


  const handleDelete = async (rowData) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_NGROK_API}/admin/${rowData.u_id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
     console.log('Delete Response',response);
     if(response.status === 200){
      window.location.reload();
     }
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  }

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NGROK_API}/admin`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    setData(response.data.data.adminData);
    setFilteredData(response.data.adminData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        paddingLeft: "0 8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "0 8px",
        justifyContent: "start",
        fontSize: "16px",
        fontWeight: "400",
      },
    },
    header: {
      style: {
        fontSize: "30px",
        fontWeight: "bold",
        paddingLeft: "0px 8px",
      },
    },
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="lg:my-[50px] my-[20px] px-[20px] lg:px-[100px] z-10">
            <DataTable
              title="Employee"
              columns={columns}
              progressPending={loading}
              data={filteredData}
              fixedHeader
              fixedHeaderScrollHeight="500px"
              selectableRows
              selectableRowsHighlight
              // onSelectedRowsChange={handleRowSelected}
              pagination
              // paginationServer
              // paginationTotalRows={totalRows}
              // onChangeRowsPerPage={handlePerRowsChange}
              // onChangePage={handlePageChange}
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="lg:w-[250px] sm:w-full md:w-[250px] form-input"
                />
              }
              actions={
                <Button onClick={() => setOpenAdd(!openAdd)}>Add</Button>
              }
              customStyles={tableCustomStyles}
            />

            {/* <div className="flex justify-center mt-3 items-center gap-4">
              <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={prev}
                disabled={active === 1}
              >
                <FaArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
              </Button>
              <div className="flex items-center gap-2">{}</div>
              <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={next}
                disabled={active === 5}
              >
                Next
                <FaArrowRight strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </>
      )}

      <Dialog open={openEdit} handler={handleOpenEdit} suppressHydrationWarning>
        <DialogHeader>Edit Employee</DialogHeader>
        <DialogBody>
          <UpdateForm rowData={selectedRow} suppressHydrationWarning />
        </DialogBody>
      </Dialog>

      <Dialog
        open={openDelete}
        handler={handleOpenDelete}
        suppressHydrationWarning
      >
        <DialogHeader>Delete Confirmation</DialogHeader>
        <DialogBody>
          <p>Are you sure you want to delete this user?</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={handleOpenDelete}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              handleOpenDelete;
              handleDelete(selectedRow);
            }}
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openView} handler={handleOpenView} suppressHydrationWarning>
        <DialogHeader>View Employee</DialogHeader>
        <DialogBody>
          <ViewForm rowData={selectedRow} suppressHydrationWarning />
        </DialogBody>
      </Dialog>

      <Dialog open={openAdd} handler={handleOpenAdd} suppressHydrationWarning>
        <DialogHeader>Add Employee</DialogHeader>
        <DialogBody>
          <AddForm />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Page;
