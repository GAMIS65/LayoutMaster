"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/LetterProgress/ProgressBar/ProgressBar";
import Navbar from "@/components/Navbar/Navbar";
import { useLayoutStore } from "@/store/useLayoutName";
import fetchBackend from "@/utils/fetchBackend";
const backendURL = process.env.NEXT_PUBLIC_BACKEND;


// TODO refactor this mess
type Mistake = {
  value: {
    key: string;
    value: number;
  };
};

type Data = {
  layoutName: string;
  charactersTyped: number;
  mistakeValues: Mistake[];
};

type KeyProps = {
  name: string;
  style: string;
  isActive: boolean;
};

type KeyboardProps = {
  keyboardLayout: KeyboardLayout;
  mistakes: any;
};

type StatsDetailsProps = {
    mistakes: any,
    data: Data
}

function Key({ name, style, isActive }: KeyProps) {
  return (
    <div
      className={`${styles.key} ${styles[style]} ${isActive ? styles.active : styles.white}`}>
      {name}
    </div>
  );
}

function Keyboard({ keyboardLayout, mistakes }: KeyboardProps) {
  const keyboard = Object.entries(keyboardLayout).map(
    ([rowKey, row], index) => (
      <div
        key={rowKey}
        className={`${styles.row} ${styles[`row${index + 1}`]}`}
      >
        {Object.entries(row).map(([key, keyProps]) => (
          <Key
            key={key}
            name={keyProps.letter[0] || ""}
            style={keyProps.finger}
            isActive={
              keyProps.letter[1] in mistakes || keyProps.letter[2] in mistakes
            }
          />
        ))}
      </div>
    )
  );
  return <div>{keyboard}</div>;
}

function transformDataMistakes(data: Data): { [key: string]: number } {
  //@ts-ignore
  return data.mistakeValues.reduce(
    (values, mistake) => {
        const key = mistake.value.key;
        const value = mistake.value.value;
        //@ts-ignore
        values[key] = (values[key] || 0) + value;
        // @ts-ignore
        const sortedEntries = Object.entries(values).sort((a, b) => b[1] - a[1]);
        return Object.fromEntries(sortedEntries);
    },
    {});
}

function sumValues(mistakes: Mistake) {
    let sum = 0;
    for (let key in mistakes) {
        // @ts-ignore
        sum += mistakes[key];
    }
    return sum;
}

function StatsDetails({mistakes, data}: StatsDetailsProps) {
    const mistakeCount = sumValues(mistakes);

    const mistakess = Object.keys(mistakes).map((key, index) => {
        return (
        <div key={index}>
            <div className={styles.mistakeTextContainer}>
                <p>{key}</p>
                <div className={styles.mistakeCount}>
                    <p>Počet chýb: {mistakes[key]}</p>
                </div>
            </div>
            <ProgressBar value={mistakes[key]} maxValue={mistakeCount} />
        </div>
        );
    });

  return (
    <div>
        <h3>Celkový počet napísaných písmen: {data.charactersTyped}</h3>
        <h3>Písmená na ktorých robíte najviac chýb</h3>
        {mistakess}
    </div>
  );
}

function Stats() {
    const [data, setData] = useState<Data>();
    const [mistakes, setMistakes] = useState({});
    const [isLoading, setLoading] = useState(true);
    const {layoutName, layout} = useLayoutStore();
    const router = useRouter();


  useEffect(() => {
    setLoading(true);
    if (layoutName) {
        const fetchData = async () => {
            try {
                const data = await fetchBackend(`/stats?layoutName=${layoutName}`, 'GET', document.cookie.replace("token=", ""));
                if (data.length === 0) {
                    setData(undefined);
                } else {
                    setData(data);
                    setMistakes(transformDataMistakes(data));
                }
            } catch (error: any) {
                    console.error(`An error occurred: ${error.message}`);
                setData(undefined);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }
}, [layoutName, router]);



  return (
    <>
    <Navbar />
    <div className={styles.container}>
        {!isLoading && !data && <h1>Nenašlí sa žiadne Štatistiky</h1>}
        {data && (
            <div className={styles.container}>
                <Keyboard keyboardLayout={layout.layout} mistakes={mistakes} />
                <div className={styles.statsDetailsContainer}>
                    <StatsDetails mistakes={mistakes} data={data} />

                </div>
            </div>
        )}
    </div>
    </>
  );
}

export default Stats;
