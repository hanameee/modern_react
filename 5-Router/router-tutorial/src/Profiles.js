import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";
import WithRouterSample from "./WithRouterSample";
const Profiles = () => {
    return (
        <div>
            <h3>유저 목록</h3>
            <ul>
                <li>
                    <NavLink
                        to="/profiles/hannah"
                        activeStyle={{ background: "black", color: "white" }}
                    >
                        hannah
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profiles/jeongho"
                        activeStyle={{ background: "black", color: "white" }}
                    >
                        jeongho
                    </NavLink>
                </li>
            </ul>

            <Route
                path="/profiles"
                exact
                render={() => <div>유저를 선택해주세요</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
            <WithRouterSample />
        </div>
    );
};

export default Profiles;
