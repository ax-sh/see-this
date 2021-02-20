import Head from "next/head";
import styles from "../styles/Home.module.scss";
import DropZone from "../components/DropZone";
import useSocket from "../hooks/useSocket";
import React from "react";

export default function Home() {
  const dragDropZoneRef = React.useRef();
  const [src, setSrc] = React.useState("");
  const bg = src ? { backgroundImage: `url("${src}")` } : {};
  const socket = useSocket("message", (message) => {
    setSrc(message);
  });
  const onDrop = (medias) => {
    const img = medias[0];
    setSrc(img);
    socket.emit("change_bg", img);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>See This</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main ref={dragDropZoneRef} className="stage" style={bg}>
        <DropZone onDrop={onDrop} />
      </main>
    </div>
  );
}
