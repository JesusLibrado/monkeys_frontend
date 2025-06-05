'use client'

import IconifyIcon from "@/wrappers/IconifyIcon";
import { BreadcrumbItem, Breadcrumb } from "react-bootstrap";
import { usePathname, useSearchParams } from "next/navigation";
import { toSentenceCase } from "@/utils/change-casing";

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
                                    {toSentenceCase(path)}
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