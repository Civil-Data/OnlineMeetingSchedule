import React from "react";

const ProfileContacts = () => {
    return (
        <div>
            <ul className="contact_list">
                <li className="list_item">
                    <span>Joel Scarinius Stävmo</span>
                    <div className="button_area">
                        <button>Invite</button>
                    </div>
                </li>
                <li className="list_item">
                    <span>Matilda Ronder</span>
                    <div className="button_area">
                        <button>Invite</button>
                    </div>
                </li>
                <li className="list_item">
                    <span>Felix Stockinger</span>
                    <div className="button_area">
                        <button>Invite</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ProfileContacts;
