import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

/*
const [counter, setValue] = useState(0);
-> 리액트 앱으로 하는 중이라 앞에 React 안붙여도됨

state를 변경할 때 ‘모든’ code 들을 항상 다시 실행됨
첫 번째 render에만 코드가 실행되고 다른 state변화에는 실행되지 않도록 만들자
예) API를 통해 데이터를 가져올 때 컴포넌트 렌더에서 API를 부르고
이후 상태가 변화할 때 그 API에서 데이터를 다시 가져오지 않게 만들 수 있다.


useEffect
- 두 개의 argument를 가지는 함수
- 첫 번째 argument는 우리가 딱 한번만 실행하고 싶은 코드
- 두 번째는 [] 배열을 넣어줌
-> useEffect가 컴포넌트의 첫 번째 렌더 시점에 iRunOnlyOnce 함수 호출
그리고 상태를 변화시키면 iRunOnlyOnce는 호출되지 않음
즉, 한번만 렌더링 됨
단순화 하여 useEffect(() => {
console.log("CALL THE API")
},[]); 써도 됨

useEffect 글자를 타이핑할 때마다 API를 새로 호출하지 않고 한번만 호출해준다.

search keyword에 변화가 있을 때 만! marvel영화를 검색하고 싶을 때
즉, 특정한 코드만 변화했을 때 원하는 코드들을 실행할 수 있는 방법
-> useEffect(() => {
console.log("SEARCH FOR", keyword);
}, []);
이렇게 실행하면 1번만 됨
그리고 []자리에 keyword 써줌
-> keyword가 변화할 때 코드를 실행할 거라고 react.js에게 알려주는 것.
이것이 바로 빈 array를 써주었을 때 코드가 단 한번만 실행되는 이유임
react가 지켜볼 게 아무것도 없으니 처음 한번만 실행되는 것

useEffect(() => {
console.log("I run when 'keyword & counter' changes.")
}, [keyword, counter]);
-> 2개도 가능

****Cleanup function
Hello 컴포넌트를 hide할 때는 컴포넌트가 스크린에서 지워지고
show를 누르면 컴포넌트가 다시 생성되므로
useEffect도 다시 실행됨을 알 수 있다.
-> 정해준 useEffect가 컴포넌트가 생성될 때 콘솔 로그를 하라는 것이기 때문
function Hello() {
useEffect(() => {
console.log("Hi");
}, []);

컴포넌트가 destroy될 때도 코드를 실행할 수 있다
-> return으로 함수를 만들어주면 된다.
useEffect는 함수를 받고, 이 함수는 dependency가 변화할 때 호출됨
현재는 dependency가 비어있으니 컴포넌트가 처음 생성될 때 함수가 호출된 후 다시
호출 되지 않음
그래서 컴포넌트가 파괴될 때도 함수를 실행하고 싶으면
useEffect 함수가 새로운 함수를 return해야 함
-> 왜냐면 deps가 비어있으면 자동으로 컴포넌트가 파괴될 때 cleanup함수가 실행되는데 그 과정이 리렌더링으로 useEffect함수가 실행되고 클린업하면서 이전에 있던 이펙트인 console.log(“created :) )가 삭제되고 새로운 이펙트 함수인 return함수가 실행되기 때문이다.
리렌더링 -> 이전 이펙트 클린업 -> 이펙트 실행
(참고 https://simsimjae.tistory.com/401)
*/

function Hello() {
    useEffect(function () {
        console.log("hi :)");
        return function () {
            console.log("bye :(");
        };
    }, []);
    useEffect(() => {
        console.log("hi :)");
        return () => console.log("bye :(");
    }, []);
    return <h1>Hello</h1>;
}

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setkeyword] = useState("");
    //const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setkeyword(event.target.value);
    useEffect(() => {
        console.log("CALL THE API");
    }, []);
    useEffect(() => {
        console.log("I run counter time");
    }, [counter]);
    useEffect(() => {
        if (keyword !== "" && keyword.length > 5) {
            console.log("search For ", { keyword });
        }
    }, [keyword]);
    useEffect(() => {
        console.log("I run counter time");
    }, [keyword, counter]);
    const [showing, setShowing] = useState(false);
    const onClick = () => setShowing((prev) => !prev);
    return (
        <div>
            <h1 className="styles.title">Welcome Back!</h1>\
            <Button text={"Continue"} />
            <input value="{keyword}" onChange="{onChange}" type="text" placeholder="Search here" />
            <h1>{counter}</h1>
            <button onClick={onClick}>Click me!</button>
            {showing ? <Hello /> : null}
            <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
        </div>
    );
}

//export default App;
