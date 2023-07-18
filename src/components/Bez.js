import React, { useState, useEffect } from "react";
import BezService from "../services/BezService";

const Bez = props => {
  const initialBezState = {
    gml_id: null,
    gemeinde_name: "",
    gemeindeschlÜssel: 0,
    land_name:"",
    land_schluessel:0,
    schluessel_gesamt: 0
  };
  const [currentBez, setCurrentBez] = useState(initialBezState);
  const [message, setMessage] = useState("");

  const getBez = id => {
    BezService.get(id)
      .then(response => {
        setCurrentBez(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBez(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBez({ ...currentBez, [name]: value });
  };

 

  const updateBez = () => {
    BezService.update(currentBez.gml_id, currentBez)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBez ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
          <div className="form-group">
              <label htmlFor="gml_id">GML ID</label>
              <input
                type="text"
                className="form-control"
                id="gml_id"
                name="gml_id"
                value={currentBez.gml_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gemeinde_name">Gemeinde Name</label>
              <input
                type="text"
                className="form-control"
                id="gemeinde_name"
                name="gemeinde_name"
                value={currentBez.gemeinde_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gemeindeschlÜssel">GemeindeschlÜssel</label>
              <input
                type="text"
                className="form-control"
                id="gemeindeschlÜssel"
                name="gemeindeschlÜssel"
                value={currentBez.gemeindeschlÜssel}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Land Name</label>
              <input
                type="text"
                className="form-control"
                id="land_name"
                name="land_name"
                value={currentBez.land_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="land_schluessel">Land Schluessel</label>
              <input
                type="text"
                className="form-control"
                id="land_schluessel"
                name="land_schluessel"
                value={currentBez.land_schluessel}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="schluessel_gesamt">Schluessel_Gesamt</label>
              <input
                type="text"
                className="form-control"
                id="schluessel_gesamt"
                name="schluessel_gesamt"
                value={currentBez.schluessel_gesamt}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBez}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Bez...</p>
        </div>
      )}
    </div>
  );
};

export default Bez;
