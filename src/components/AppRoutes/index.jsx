import { BrowserRouter as Router, Route, Routes } from "react-router";

import Home from "../../pages/Home";
import CounterApp from "../../pages/CounterApp";
import TodoListApp from "../../pages/TodoListApp";
import ProfileCard from "../../pages/ProfileCard";
import ProductList from "../../pages/ProductList";
import CommentSystem from "../../pages/CommentSystem";
import WeatherApp from "../../pages/WeatherApp";
import Navigation from "../../layout/Navigation";

function AppRoutes() {
    return (
        <Router>
            <Navigation />

            <Routes>
                <Route path="/exercise-day-35" element={<Home />}></Route>
                <Route
                    path="/exercise-day-35/counter-app"
                    element={<CounterApp />}></Route>
                <Route
                    path="/exercise-day-35/todo-list-app"
                    element={<TodoListApp />}></Route>
                <Route
                    path="/exercise-day-35/profile-card"
                    element={<ProfileCard />}></Route>
                <Route
                    path="/exercise-day-35/product-list"
                    element={<ProductList />}></Route>
                <Route
                    path="/exercise-day-35/comment-system"
                    element={<CommentSystem />}></Route>
                <Route
                    path="/exercise-day-35/weather-app"
                    element={<WeatherApp />}></Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
