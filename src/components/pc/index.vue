<template>
  <div class="container">
    <div class="box">
      <div class="logo"></div>
      <h1>Subscription</h1>
      <div class="form">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          :label-position="labelPosition"
          label-width="80px"
          status-icon
        >
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="formData.email"
              placeholder="Please enter your registered email address"
            />
          </el-form-item>
          <el-form-item label="Code" prop="code">
            <el-input
              v-model="formData.code"
              placeholder="Please enter the activation code"
            />
          </el-form-item>
        </el-form>

        <div class="tips">
          {{ errMsg.username ? errMsg.username : "" }}
          &nbsp;&nbsp;
          {{ errMsg.isAvailable ? errMsg.isAvailable : "" }}
          &nbsp;&nbsp;
          {{ errMsg.code ? errMsg.code : "" }}
        </div>
      </div>

      <div>
        <el-button
          v-if="!isShowActive"
          class="btn"
          type="primary"
          @click="validateForm"
        >
          verify
        </el-button>
        <el-button v-else class="btn" type="success" @click="activation">
          activation
        </el-button>
      </div>
    </div>

    <div class="qrcode">
      <div class="part left">
        <a
          target="_blank"
          href="https://play.google.com/store/apps/details?id=com.tops.photobooth&pli=1"
        >
          <img src="../../assets/gplay_download.png" alt="" />
        </a>
        <img class="down" src="../../assets/google.png" alt="" />
      </div>

      <div class="part right">
        <a
          target="_blank"
          href="https://apps.apple.com/gb/app/doelbooth/id1575322670"
        >
          <img src="../../assets/appstore_download.png" alt="" />
        </a>
        <img class="down" src="../../assets/ios.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { validateLoginForm, activationFn } from "../../api/active.js";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
const labelPosition = ref("right");
const formData = reactive({
  // email: "568330858@qq.com",
  // code: "2f24ed1f-a2bb-4b8c-8c0e-824dc0188e8c",
  email: "",
  code: "",
});

const validateEnail = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("Please fill in your email address"));
  }
  callback();
};
const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("Please fill in the activation code"));
  }
  callback();
};

const formRules = reactive({
  email: [
    {
      required: true,
      validator: validateEnail,
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      validator: validateCode,
      trigger: "blur",
    },
  ],
});

const formRef = ref();

const isShowActive = ref(false);

const errMsg = reactive({
  username: "",
  code: "",
  isAvailable: "",
  type: "",
});

let str = ref("");

const validateForm = () => {
  errMsg.username = "";
  errMsg.code = "";
  errMsg.isAvailable = "";
  errMsg.type = "";
  formRef.value.validate((valid) => {
    if (valid) {
      validateLoginForm({ email: formData.email, code: formData.code }).then(
        (res) => {
          let finalRes = res.data.result;
          if (!finalRes.username) {
            errMsg.username = "Email not registered";
          }
          if (!finalRes.isAvailable) {
            errMsg.isAvailable = "The activation code is invalid";
          }
          if (!finalRes.code) {
            errMsg.code = "The activation code was not queried";
          }

          switch (res.data.result.type) {
            case "1":
              str.value = "One Week";
              break;
            case "2":
              str.value = "One Month";
              break;
            case "3":
              str.value = "Three Months";
              break;
            case "4":
              str.value = "One Year";
              break;
            default:
              break;
          }

          if (finalRes.username && finalRes.isAvailable && finalRes.code) {
            isShowActive.value = true;
          }
        }
      );
    }
  });
};

const activation = () => {
  activationFn({ email: formData.email, code: formData.code }).then((res) => {
    ElMessage({
      type: "success",
      message: `You have activated ${str.value} VIP, please log in to the APP to use`,
      duration: 3000,
    });
    formRef.value.resetFields();
    isShowActive.value = false;
  });
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 36px;
  .box {
    position: relative;
    width: 700px;
    height: 400px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    .logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -50px;
      z-index: 9;
      transform: translateX(-50%);
      background: url("../../assets/logo.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    .form {
      margin-top: 40px;
      .el-form-item {
        margin-bottom: 26px;
        :deep(.el-form-item__label) {
          font-size: 28px;
          height: 40px;
          line-height: 40px;
        }
        :deep(.el-input__wrapper) {
          height: 40px;
        }
        :deep(.el-input__inner) {
          &::placeholder {
            color: #999;
            font-size: 16px;
            font-weight: 700;
          }
        }
        :deep(.el-form-item__error) {
          color: red;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }

    .btn {
      padding: 20px;
      box-sizing: border-box;
      font-size: 28px;
    }
  }
  .qrcode {
    margin: 20px auto;
    width: 700px;
    display: flex;
    justify-content: space-between;
    .part {
      // width: 50%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      a {
        display: block;
        width: 150px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .down {
        width: 150px;
        height: 150px;
      }
    }
  }
}

// .container {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   font-size: 24px;
//   .box {
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     width: 20.8333vw;
//     // padding: 40px;
//     color: #000;
//     box-sizing: border-box;
//     background-color: rgba(255, 255, 255, 0.25);
//     backdrop-filter: blur(10px);
//     -webkit-backdrop-filter: blur(6px);
//     border: 1px solid rgba(255, 255, 255, 0.18);
//     box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
//     -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
//     .logo {
//       width: 6.25rem;
//       height: 6.25rem;
//       border-radius: 50%;
//       position: absolute;
//       left: 50%;
//       top: -4.375rem;
//       z-index: 9;
//       transform: translateX(-50%);
//       background: url("../../assets/logo.png");
//       background-repeat: no-repeat;
//       background-size: cover;
//       background-position: center;
//     }
//   }
//   h1 {
//     font-size: 1.5rem;
//   }
//   .form {
//     margin: 1.25rem 0;
//   }
//   .btn {
//     // width: 10rem;
//     margin: auto;
//     padding: 20px;
//     box-sizing: border-box;
//   }
// }
// /deep/.el-form-item__label {
//   color: #000 !important;
// }
// .tips {
//   color: red;
// }

// .qrcode {
//   margin: 20px auto;
//   min-width: 375px;
//   width: 37.5rem;
//   display: flex;
//   justify-content: space-between;
//   .part {
//     width: 50%;
//     height: 100%;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     a {
//       display: block;
//       width: 100px;
//       height: 40px;
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//     .down {
//       width: 100px;
//       height: 100px;
//     }
//   }
// }
// .el-form-item {
//   margin-bottom: 30px;
// }
</style>
