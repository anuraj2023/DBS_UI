import React, { useState } from "react";
import BezService from "../services/BezService";


const AddBez = () => {
  const initialBezState = {
    gml_id: null,
    gemeinde_name: "",
    gemeindeschlÜssel: 0,
    land_name:"",
    land_schluessel:0,
    schluessel_gesamt: 0
  
  };
  const [bez, setBez] = useState(initialBezState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBez({ ...bez, [name]: value });
  };

  const saveBez = () => {
    var data = {
      gemeinde_name: bez.gemeinde_name,
      gemeindeschlÜssel: bez.gemeindeschlÜssel,
      land_name: bez.land_name,
      land_schluessel: bez.land_schluessel,
      schluessel_gesamt: bez.schluessel_gesamt
    };

    BezService.create(data)
      .then(response => {
        setBez({
          gml_id: response.data.gml_id,
          gemeinde_name: response.data.gemeinde_name,
          gemeindeschlÜssel: response.data.gemeindeschlÜssel,
          land_name: response.data.land_name,
          land_schluessel: response.data.land_schluessel,
          schluessel_gesamt: response.data.schluessel_gesamt
  
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBez = () => {
    setBez(initialBezState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBez}>
            Add
          </button>
        </div>
      ) : (
        <div>

          <div className="form-group">
            <label htmlFor="gemeinde_name">Gemeinde Name</label>
            <input
              type="text"
              className="form-control"
              id="gemeinde_name"
              required
              value={bez.description}
              onChange={handleInputChange}
              name="gemeinde_name"
            />
          </div>


          <div className="form-group">
            <label htmlFor="gemeindeschlÜssel">GemeindeschlÜssel</label>
            <input
              type="number"
              className="form-control"
              id="gemeindeschlÜssel"
              required
              value={bez.gemeindeschlÜssel}
              onChange={handleInputChange}
              name="gemeindeschlÜssel"
            />
          </div>


          <div className="form-group">
            <label htmlFor="land_name">Land Name</label>
            <input
              type="text"
              className="form-control"
              id="land_name"
              required
              value={bez.land_name}
              onChange={handleInputChange}
              name="land_name"
            />
          </div>


          <div className="form-group">
            <label htmlFor="land_schluessel">Land Schluessel</label>
            <input
              type="text"
              className="form-control"
              id="land_schluessel"
              required
              value={bez.land_schluessel}
              onChange={handleInputChange}
              name="land_schluessel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="schluessel_gesamt">Schluessel Gesamt</label>
            <input
              type="text"
              className="form-control"
              id="schluessel_gesamt"
              required
              value={bez.schluessel_gesamt}
              onChange={handleInputChange}
              name="schluessel_gesamt"
            />
          </div>
          

          <button onClick={saveBez} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBez;
