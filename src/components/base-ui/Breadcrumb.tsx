'use client'

import IconifyIcon from "@/wrappers/IconifyIcon";
import { BreadcrumbItem, Breadcrumb } from "react-bootstrap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toNameCase } from "@/utils/strings";
import { useState } from "react";

const BreadcrumbRouter = () => {

    const params = useSearchParams();
    const paths = usePathname();
    const pathNames = paths.split('/').filter( path => path );

    
    return (
        <div>
            <nav aria-label="breadcrumb">
                <Breadcrumb className="mb-0 py-2">
                    {
                        pathNames.map((path, index)=> {
                            return (
                                <BreadcrumbItem className='m-0' key={path}>
                                    {toNameCase(path)}
                                    <span className="p-2" style={{ height: 24 }}>
                                        <IconifyIcon icon="tabler:chevron-right" height={16} width={16} />
                                    </span>
                                </BreadcrumbItem>
                            );
                        })
                    }
                </Breadcrumb>
            </nav>
        </div>
    );

}

export default BreadcrumbRouter;