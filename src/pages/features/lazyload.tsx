import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

export default function LazyLoadPage() {
  const id = uniqueId();
  const [count, setCount] = useState(1);
  const [arr, setArr] = useState(
    Array.apply(null, Array(20)).map((a, index) => {
      return {
        uniqueId: id,
        once: [6, 7].indexOf(index) > -1,
      };
    })
  );

  const handleClick = () => {
    const id = uniqueId();

    setArr(
      arr.map((el) => {
        return {
          ...el,
          uniqueId: id,
        };
      })
    );
  };

  return (
    <div className="wrapper">
      <Operation type="placeholder" onClickUpdate={handleClick} />
      <div className="widget-list">
        {arr.map((el, index) => {
          return (
            <LazyLoad
              once={el.once}
              key={index}
              height={200}
              offset={[-200, 0]}
              placeholder={<PlaceholderComponent />}
              debounce={500}
            >
              <Widget
                once={el.once}
                id={el.uniqueId}
                count={index + 1}
                setCount={setCount}
              />
            </LazyLoad>
          );
        })}
      </div>
    </div>
  );
}

export function Operation({ type, onClickUpdate, noExtra = false }) {
  return (
    <div className="op">
      <div className="top-link">
        <a
          href={`https://github.com/jasonslyvia/react-lazyload/tree/master/examples/pages/${type}.js`}
          target="_blank"
          title="Checkout source file in Github"
        >
          source
        </a>
        <Link href="/">back</Link>
      </div>
      {!noExtra && (
        <div>
          <a
            className="update-btn button-secondary pure-button"
            onClick={onClickUpdate}
          >
            Update
          </a>
          <p className="desc">
            Clicking this button will make all <code>Widgets</code> in{" "}
            <strong> visible area </strong>
            reload data from server.
          </p>
          <p className="desc">
            Pay attention to <code>props from parent</code> block in{" "}
            <code>Widget</code>
            to identify how LazyLoad works.
          </p>
        </div>
      )}
    </div>
  );
}

export function PlaceholderComponent() {
  return (
    <div className="placeholder">
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
}

export function Widget({ once, id, count, setCount }) {
  const [isReady, setIsReady] = useState(true);

  useCallback((nextProps) => {
    if (nextProps.id !== id && id) {
      setIsReady(false);

      setTimeout(() => {
        setIsReady(true);
        setCount(count + 1);
      }, 500);
    } else {
      setIsReady(true);
    }
  }, []);

  return isReady ? (
    <div className="widget">
      <span className="widget-counter">{count}</span>
      {once ? (
        <div className="widget-text once">
          <code>
            &lt;LazyLoad once&gt;
            <br />
            &nbsp;&nbsp;&lt;Widget /&gt;
            <br />
            &lt;/LazyLoad&gt;
          </code>
        </div>
      ) : (
        <div className="widget-text">
          <code>
            &lt;LazyLoad&gt;
            <br />
            &nbsp;&nbsp;&lt;Widget /&gt;
            <br />
            &lt;/LazyLoad&gt;
          </code>
        </div>
      )}
      <p>render times: {count}</p>
      <p>props from parent: {id}</p>
    </div>
  ) : (
    <div className="widget loading">loading...</div>
  );
}

export function uniqueId() {
  return (Math.random().toString(36) + "00000000000000000").slice(2, 10);
}
