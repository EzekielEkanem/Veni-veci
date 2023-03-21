import { useState } from 'react'

const Banlist = ({ bannedAttribute }) => {
    return (
      <div>
        <h2>Ban List</h2>
        <p>Select an attribute in your listing to ban it</p>
        <div className="bannedlist-container">
            {bannedAttribute && bannedAttribute.length > 0 ? (
                bannedAttribute.map((attr, index) => (
                    <li className="banned" key={index}>
                      <input
                        onClick={() => handleRemove(index)}
                        type="button"
                        className="bannedAttribute"
                        value={attr}
                        alt="Undefined banned list"
                      />
                    </li>
                  )
                    
                )
            ) : (
                <div>
                    <h3>You haven't banned an attribute yet!</h3>
                </div>
            )}
        </div>

      </div>
    );
  };
  
  export default Banlist;