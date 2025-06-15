"use client";

import Footer from "@/components/base-ui/Footer";
import HorizontalNavBar from "@/components/base-ui/HorizontalNav/page";
import LeftSideBar from "@/components/base-ui/LeftSideBar";
import IconifyIcon from "@/wrappers/IconifyIcon";
import { useLayoutContext } from "@/context/useLayoutContext";
import { getHorizontalMenuItems, getMenuItems } from "@/helpers/Manu";
import { ChildrenType } from "@/types/component-props";
import React from "react";
import TopBar from "@/components/base-ui/TopBar";
import { RecepcionProvider } from "@/context/useRecepcionContext";
import { Metadata } from "next";
import BreadcrumbRouter from "@/components/base-ui/Breadcrumb";
import { Card } from "react-bootstrap";

// export const metadata: Metadata = { title: "Portal de recepción" };

const RecepcionLayout = ({ children }: ChildrenType) => {
  const { orientation } = useLayoutContext();
  const menuItems = getMenuItems();
  return (
    <RecepcionProvider>
      {orientation == "vertical" ? (
        <div className="wrapper">
          <TopBar />
          <LeftSideBar />
          <div
            className="modal fade"
            id="searchModal"
            tabIndex={-1}
            aria-labelledby="searchModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content bg-transparent">
                <form>
                  <Card className="mb-1">
                    <div
                      className="px-3 py-2 d-flex flex-row align-items-center"
                      id="top-search"
                    >
                      <IconifyIcon icon="ri:search-line" className="fs-22" />
                      <input
                        type="search"
                        className="form-control border-0"
                        id="search-modal-input"
                        placeholder="Search for actions, people,"
                      />
                      <button
                        type="submit"
                        className="btn p-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        [esc]
                      </button>
                    </div>
                  </Card>
                </form>
              </div>
            </div>
          </div>
          <div className="page-content">
            <div className="page-container">
              <BreadcrumbRouter />
              {children}
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <TopBar />
          <HorizontalNavBar menuItems={menuItems} />
          <div
            className="modal fade"
            id="searchModal"
            tabIndex={-1}
            aria-labelledby="searchModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content bg-transparent">
                <form>
                  <Card className="mb-1">
                    <div
                      className="px-3 py-2 d-flex flex-row align-items-center"
                      id="top-search"
                    >
                      <IconifyIcon icon="ri:search-line" className="fs-22" />
                      <input
                        type="search"
                        className="form-control border-0"
                        id="search-modal-input"
                        placeholder="Search for actions, people,"
                      />
                      <button
                        type="submit"
                        className="btn p-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        [esc]
                      </button>
                    </div>
                  </Card>
                </form>
              </div>
            </div>
          </div>
          <div className="page-content">
            <div className="page-container">
              <BreadcrumbRouter />
              {children}
            </div>
            <Footer />
          </div>
        </div>
      )}
    </RecepcionProvider>
  );
};

export default RecepcionLayout;
