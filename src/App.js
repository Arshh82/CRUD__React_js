import React, { useEffect, useState } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const App = () => {
  let [data, updatedata] = useState([]);
  let [product, updateproduct] = useState({ id:'', name: '', image: '', imagehov: '', size: '',amount:'' });
  useEffect(() => {
    show();
  });
  async function show() {
    var res = await axios.get("https://arshil-eyewear.onrender.com/Eyeglassrangeapi/");
    updatedata(res.data);
  }
  function change(e) {
    updateproduct({ ...product, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className='add' >
        <form onSubmit={(e) => {
          e.preventDefault();
          async function addData() {
            var res = await axios.post('https://arshil-eyewear.onrender.com/Eyeglassrangeapi/', product);
            alert("Sucess")
            if (res.status === 200) {
              alert("product added sucessfully");
            }
          }
          addData();
        }}>
          <div className="col-lg-12 offset-sm-1">
            <br />
            Name <br />
            <input type="text" name="name" value={product.name} onChange={change} className='form-control' /><br />

            Image <br />
            <input type="url" name="image" value={product.image} onChange={change} className='form-control' /><br />
            Image_2<br />
            <input type="url" name="imagehov" value={product.imagehov} onChange={change} className='form-control' /><br />
            Size<br />
            <input type="text" name="size" value={product.size} onChange={change} className='form-control' /><br />
             Amount<br />
            <input type="number" name="amount" value={product.amount} onChange={change} className='form-control' /><br />
            ID<br />
            <input type="number" name="id" value={product.id} onChange={change} className='form-control' /><br />
            <button className='btn btn-primary' type='submit' id='subbtn'>Add Product</button>
            <hr></hr>
            <thead>
            <th>CURRENT LENGTH {data.length}</th>
              </thead>
          </div>
        </form>
      </div>
      <hr />
      <table className='table table-bordered text-center table-hover '>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>IMAGE</th>
            <th>IMAGE_HOV</th>
            <th>SIZE</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => {
            return (<tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td><img src={v.image} alt='no_img' className='d-flex w-100 h-100' /></td>
              <td><img src={v.imagehov} alt='no_img' className=' d-flex w-100 h-100' /></td>
              <td>{v.size}</td>
              <td>{v.amount}</td>
              <td><button className='btn btn-danger' onClick={(e) => {
                e.preventDefault();
                async function dltData() {
                  var res = await axios.delete(`https://arshil-eyewear.onrender.com/Eyeglassrangeapi/${v.id}`);
                  alert("Sucess")
                }
                dltData();
              }}
              >Delete</button></td>
              <td><button className='btn btn-success' onClick={(e) => {
                e.preventDefault();
                async function dltData() {
                  var res = await axios.put('https://arshil-eyewear.onrender.com/Eyeglassrangeapi/');
                  alert("Sucess")
                }
                dltData();
              }}
              >update</button></td>
            </tr>)
          })}

          
        </tbody>
        
      </table>

    </>
  )
}
export default App