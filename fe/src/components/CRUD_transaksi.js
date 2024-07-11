import React from "react";
import axios from "axios";
import $ from "jquery";
import { base_url } from "../config";

import moment from "moment";

export default class Transaksi extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      found: "",
      data: [],
      modalLabel: "",
      action: "",
      data_admin: [],

      id: "",
      id_outlet: "",
      id_transaksi: "",
      id_member: "",
      kode_invoice: "",
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      id_paket: "",
      qty: "",
      status: "",
      dibayar: "",
      nama_paket: "",
      harga: "",
    };
    // dapetin token dari localstorage
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
    } else {
      // token ga ada, redirect ke halaman login
      window.location = "/login";
    }
  }

  getDataAdmin = () => {
    let data = JSON.parse(localStorage.getItem("data_admin"));
    if (!data) {
      window.location = "/login";
    } else {
      this.setState({
        data_admin: data,
      });
    }
  };

  getData = () => {
    let url = base_url + "/transaksi";

    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
      })
      .then((response) => {
        this.setState({
          found: response.data.found,
        });
        if (this.state.found) {
          let data = JSON.parse(JSON.stringify(response.data.data_transaksi));
          this.setState({
            data: data,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  Add = () => {
    $("#modal_transaksi").modal("show");
    this.setState({
      action: "add",
      modalLabel: "Tambah Data",
      id: "",
      id_outlet: "",
      id_user: "",
      id_member: "",
      kode_invoice: "",
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      id_paket: "",
      qty: "",
      status: "",
      dibayar: "",
      id_transaksi: "",
      keterangan: "",
    });
  };

  Edit = (selectedItem) => {
    $("#modal_transaksi").modal("show");
    this.setState({
      action: "edit",
      modalLabel: "Edit Data",
      id: selectedItem.id,
      id_outlet: selectedItem.id_outlet,
      id_user: selectedItem.id_user,
      id_member: selectedItem.id_member,
      kode_invoice: selectedItem.kode_invoice,
      tgl: selectedItem.tgl,
      batas_waktu: selectedItem.batas_waktu,
      tgl_bayar: selectedItem.tgl_bayar,
      id_paket: selectedItem.id_paket,
      qty: selectedItem.qty,
      status: selectedItem.status,
      dibayar: selectedItem.dibayar,
    });
  };

  Detail = (selectedItem) => {
    $("#modal_detail").modal("show");
    this.setState({
      modalLabel: "Detail Data",
      id: selectedItem.id,
      id_outlet: selectedItem.id_outlet,
      id_user: selectedItem.id_user,
      id_member: selectedItem.id_member,
      kode_invoice: selectedItem.kode_invoice,
      tgl: selectedItem.tgl,
      batas_waktu: selectedItem.batas_waktu,
      tgl_bayar: selectedItem.tgl_bayar,
      id_paket: selectedItem.id_paket,
      qty: selectedItem.qty,
      status: selectedItem.status,
      dibayar: selectedItem.dibayar,
      nama_paket: selectedItem.tb_paket.nama_paket,
      harga: selectedItem.tb_paket.harga,
    });

    console.log(this.state.nama_paket);
  };

  Delete = (selectedItem) => {
    if (window.confirm("Yakin nih dihapus?")) {
      let url = base_url + "/transaksi/" + selectedItem.id;

      axios
        .delete(url, {
          headers: {
            Authorization: "Bearer " + this.state.token,
          },
        })
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  };

  Save = (event) => {
    event.preventDefault();
    $("#modal_transaksi").modal("hide");

    let data = {
      id: this.state.id,
      id_outlet: this.state.id_outlet,
      id_user: this.state.id_user,
      id_member: this.state.id_member,
      kode_invoice: this.state.kode_invoice,
      tgl: this.state.tgl,
      batas_waktu: this.state.batas_waktu,
      tgl_bayar: this.state.tgl_bayar,
      id_paket: this.state.id_paket,
      qty: this.state.qty,
      status: this.state.status,
      dibayar: this.state.dibayar,
    };

    // let detail = {
    //     id_transaksi: 10,

    //     keterangan: this.state.keterangan
    // }
    const url = base_url + "/transaksi";
    // const detail_url = base_url + "/transaksi_detail"

    if (this.state.action === "add") {
      axios
        .post(url, data, {
          headers: {
            Authorization: "Bearer " + this.state.token,
          },
        })
        .then((response) => {
          this.getData();
        })
        .catch((error) => console.log(error));

      // axios.post(detail_url, detail, {
      //     headers: {
      //         Authorization: "Bearer " + this.state.token
      //     }
      // })
      //     .then(response => {
      //         console.log("detail inserted");
      //     })
      //     .catch(error => console.log(error))
    } else if (this.state.action === "edit") {
      axios
        .put(url, data, {
          headers: {
            Authorization: "Bearer " + this.state.token,
          },
        })
        .then((response) => {
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  };

  ConvertTime = (time) => {
    return moment(`${time}`).utc().format("YYYY-MM-DD");
  };
  componentDidMount() {
    this.getData();
    this.getDataAdmin();
  }

  render() {
    return (
      <>
        <div class="d-flex justify-content-between">
          <div>
            <h3 className="fw-bold">Panel Transaksi</h3>
          </div>
          <div>
            <button
              className="btn btn-primary mx-2 fw-bold"
              type="button"
              onClick={() => this.Add()}
            >
              <i class="fas fa-plus"></i> Transaksi
            </button>
          </div>
        </div>
        <div className="table-responsive mt-2">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Kode Invoice</th>
                <th scope="col">Info</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Status</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <>
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.kode_invoice}</td>
                    <td>
                      Pelanggan: {item.id_member} <br /> Pengurus:{" "}
                      {item.id_user} <br /> Outlet: {item.id_outlet}
                    </td>
                    <td>
                      From: {this.ConvertTime(item.tgl)} <br />
                      to: {this.ConvertTime(item.batas_waktu)} <br />
                      Bayar: {this.ConvertTime(item.tgl_bayar)}
                    </td>
                    <td>
                      Status: {item.status} <br />
                      {item.dibayar}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary mx-2 fw-bold"
                        type="button"
                        onClick={() => this.Edit(item)}
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger fw-bold"
                        type="button"
                        onClick={() => this.Delete(item)}
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success mx-2 fw-bold"
                        type="button"
                        onClick={() => this.Detail(item)}
                      >
                        <i class="fas fa-file"></i>
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* modal */}
        <div
          class="modal fade"
          id="modal_transaksi"
          tabindex="-1"
          aria-labelledby="modalLabel"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">
                  {this.state.modalLabel} Transaksi
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={(ev) => this.Save(ev)}>
                <div class="modal-body">
                  id_outlet
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="id_outlet"
                      value={this.state.data_admin.id_outlet}
                      required
                      disabled
                    />
                  </div>
                  id_user
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="id_user"
                      value={this.state.id_user}
                      onChange={(ev) =>
                        this.setState({ id_user: ev.target.value })
                      }
                      required
                    />
                  </div>
                  id_member
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="id_member"
                      value={this.state.id_member}
                      onChange={(ev) =>
                        this.setState({ id_member: ev.target.value })
                      }
                      required
                    />
                  </div>
                  kode_invoice
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="kode_invoice"
                      value={this.state.kode_invoice}
                      onChange={(ev) =>
                        this.setState({ kode_invoice: ev.target.value })
                      }
                      required
                    />
                  </div>
                  tgl
                  <div class="input-group mb-3">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="tgl"
                      value={this.ConvertTime(this.state.tgl)}
                      onChange={(ev) => this.setState({ tgl: ev.target.value })}
                      required
                    />
                  </div>
                  batas_waktu
                  <div class="input-group mb-3">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="batas_waktu"
                      value={this.ConvertTime(this.state.batas_waktu)}
                      onChange={(ev) =>
                        this.setState({ batas_waktu: ev.target.value })
                      }
                      required
                    />
                  </div>
                  tgl_bayar
                  <div class="input-group mb-3">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="tgl_bayar"
                      value={this.ConvertTime(this.state.tgl_bayar)}
                      onChange={(ev) =>
                        this.setState({ tgl_bayar: ev.target.value })
                      }
                      required
                    />
                  </div>
                  id_paket
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="id_paket"
                      value={this.state.id_paket}
                      onChange={(ev) =>
                        this.setState({ id_paket: ev.target.value })
                      }
                      required
                    />
                  </div>
                  qty
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="qty"
                      value={this.state.qty}
                      onChange={(ev) => this.setState({ qty: ev.target.value })}
                      required
                    />
                  </div>
                  {/* keterangan
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="keterangan" 
                                            value={this.state.keterangan}
                                            onChange={ev => this.setState({keterangan: ev.target.value})}
                                            required/>
                                        </div> */}
                  status
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="status"
                      value={this.state.status}
                      onChange={(ev) =>
                        this.setState({ status: ev.target.value })
                      }
                      required
                    />
                  </div>
                  dibayar
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="dibayar"
                      value={this.state.dibayar}
                      onChange={(ev) =>
                        this.setState({ dibayar: ev.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Detail */}
        <div
          className="modal fade"
          id="modal_detail"
          tabindex="-1"
          aria-labelledby="modalLabel"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5>Detail of Transaction</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Paket</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{this.state.id}</td>
                      <td>{this.state.nama_paket}</td>
                      <td>{this.state.harga}</td>
                      <td>{this.state.qty}</td>
                      <td>{this.state.harga * this.state.qty}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
