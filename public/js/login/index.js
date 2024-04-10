import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, get, ref, child, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQk0PGIztg7qltOimH1_9_lLl5rluKsV8",
    authDomain: "fir-d023a.firebaseapp.com",
    databaseURL: "https://fir-d023a-default-rtdb.firebaseio.com",
    projectId: "fir-d023a",
    storageBucket: "fir-d023a.appspot.com",
    messagingSenderId: "81322751429",
    appId: "1:81322751429:web:eeb12e1ec56b1970c807ac",
    measurementId: "G-KZQQJNVVWJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);


let EmailInp = document.getElementById('emailInp');
let IdInp;
let PassInp = document.getElementById('passwordInp');
// let MainForm = document.getElementById('MainForm');
let LoginBtn = document.getElementById('loginBtn');

let ForgotPassLabel = document.getElementById('forgotpasslabel');

let getID = () => {
    let tmp = EmailInp.value.trim().substring(0,9);
    IdInp = tmp.toUpperCase();
}



let SignInUser = evt => {
    evt.preventDefault();
    getID();
    signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
        .then((credentials) => {
            get(child(dbref, 'SinhVien/' + IdInp)).then((snapshot) => {
                if (snapshot.exists() && snapshot.val().id == IdInp && snapshot.val().email == EmailInp.value) {
                    sessionStorage.setItem("user-info", JSON.stringify({
                        ho_va_ten: snapshot.val().ho_va_ten,
                        email: snapshot.val().email,
                        mat_khau: snapshot.val().mat_khau,
                        id: snapshot.val().id,
                        Result: snapshot.val().Hoc_ki
                    }))
                    sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                    update(ref(db, 'SinhVien/' + IdInp), {
                        mat_khau: PassInp.value
                    });
                    window.location.href = "Home.html";
                }

            })

            get(child(dbref, 'GiangVien/' + IdInp)).then((snapshot) => {
                if (snapshot.exists() && snapshot.val().id == IdInp && snapshot.val().email == EmailInp.value) {
                    sessionStorage.setItem("user-info", JSON.stringify({
                        ho_va_ten: snapshot.val().ho_va_ten,
                        email: snapshot.val().email,
                        mat_khau: snapshot.val().mat_khau,
                        id: snapshot.val().id
                    }))
                    sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                    update(ref(db, 'SinhVien/' + IdInp), {
                        mat_khau: PassInp.value
                    });
                    window.location.href = "HomeGV.html";
                }

            })

            get(child(dbref, 'QuanTriVien/' + IdInp)).then((snapshot) => {
                if (snapshot.exists() && snapshot.val().id == IdInp && snapshot.val().email == EmailInp.value) {
                    sessionStorage.setItem("user-info", JSON.stringify({
                        ho_va_ten: snapshot.val().ho_va_ten,
                        email: snapshot.val().email,
                        mat_khau: snapshot.val().mat_khau,
                        id: snapshot.val().id
                    }))
                    sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                    update(ref(db, 'SinhVien/' + IdInp), {
                        mat_khau: PassInp.value
                    });
                    window.location.href = "HomeQTV.html";
                }

            })
        })
        .catch((error) => {
            alert("Sai các thông tin đăng nhập!");
            console.log(error.code);
            console.log(error.message);
        });

}



let ForgotPassword = () => {
    sendPasswordResetEmail(auth, EmailInp.value)
        .then(() => {
            alert("Kiểm tra email của bạn để đặt lại mật khẩu!");
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        });
}

// MainForm.addEventListener('submit', SignInUser);
LoginBtn.addEventListener('click', SignInUser);
ForgotPassLabel.addEventListener('click', ForgotPassword);