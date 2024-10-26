/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdOutlinePlayCircle } from "react-icons/md";
import Menu from "./Menu";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modal";
import ContentViewer from "./ContentViewer";
import { ReactNode } from 'react';
import { getContentType, SectionItemValues } from "../utils/utilities";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiletypeDocx } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";

interface SectionItemProps {
    contentId: string,
    index: number,
    title: string,
    path: string
    sectionItems: SectionItemValues[]
}

const iconMapper: Record<string, ReactNode> = {
    "video": <MdOutlinePlayCircle className="text-lg" />,
    "image": <CiImageOn className="text-lg" />,
    "pdf": <IoDocumentTextOutline className="text-lg" />,
    "word": <BsFiletypeDocx className="text-lg" />
}

export default function SectionItem({ title, contentId, path, index, sectionItems }: SectionItemProps) {
    const type = getContentType(path);
    const { user } = useAuth();
    return (
        <div>
            <div className="flex items-center justify-between px-7">
                <div className="flex items-center gap-2 text-sm">
                    <Modal.Open name={`conetent-viewer-${contentId}`}>
                        {iconMapper[type || '']}
                        <span>{title}</span>
                    </Modal.Open>

                    <Modal.Window name={`conetent-viewer-${contentId}`}>
                        <ContentViewer index={index} sectionItems={sectionItems} />
                    </Modal.Window>
                </div>
                {
                    user.studentId ? ('') : (
                        <div className="relative">
                            <Menu.Toggler id={contentId} />

                            <Menu.List id={contentId} className="border shadow-sm dark:border-stone-700">
                                <Menu.Option id={contentId}>
                                    <FaRegEdit />
                                    <span className="text-xs">Update content</span>
                                </Menu.Option>
                                <Menu.Option id={contentId}>
                                    <RiDeleteBin5Line />
                                    <span className="text-xs">Delete content </span>
                                </Menu.Option>
                            </Menu.List>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
