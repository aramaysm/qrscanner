import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from "react-native";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import SvgComponent_Mine from "./SVG_Component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Services from "./Services";
import * as Device from "expo-device";
const { width, height } = Dimensions.get("window");

export default function GetCredentials(props) {
  const [areCredentialsLoaded, setAreCredentialsLoaded] = useState(false);
  const { isNew, onGetCredentials } = props;

  const onLogin = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Token");
    const tokenLocalStorage = JSON.parse(jsonValue);

    axios
      .post(
        Services.getDeviceHandlerCredentials(),
        {
          brand: Device.brand.toUpperCase(),
          model: Device.modelName,
        },
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 300) {
          console.log("data loaded", response.data.data);
          setAreCredentialsLoaded(true);
          let jsonValue = JSON.stringify(response.data.data.uniqueId);
          AsyncStorage.setItem("@storage_Device_Id", jsonValue);
          jsonValue = JSON.stringify(response.data.data.secretToken);
          AsyncStorage.setItem("@storage_Device_Token", jsonValue);

          setTimeout(()=>{
            onGetCredentials();
          },2000)
        }
      })
      .catch((error) => {
        console.log("Error ", error);
        if (error.response.status === 403) {
          setAuthenticated(false);
        } else if (error.response.status === 409) {
          console.log("Error conflict");
        } else if (error.response.status === 422) {
          console.log("Error invalid fields");
        }
      });
  };

  return (
    <View>
      <View style={styles.svgcontainer}>
        <SvgComponent_Mine
          svgMarkup={`<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="826" height="541" viewBox="0 0 826 541" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M990.63733,719.30506l1.22492-.02393a284.08018,284.08018,0,0,0-4.34823-40.59824c-5.29683-28.71268-14.10454-47.56977-26.17851-56.04732l-.70337,1.00242C988.837,643.44128,990.623,718.54845,990.63733,719.30506Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><path d="M975.32581,719.012l1.22492-.02393c-.02633-1.3565-.79191-33.32647-13.37783-42.16289l-.70338,1.00243C974.54768,686.30755,975.31983,718.686,975.32581,719.012Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><circle cx="766.66361" cy="438.12463" r="6.12461" fill="#f1f1f1"/><circle cx="769.6966" cy="490.79626" r="6.12461" fill="#f1f1f1"/><path d="M978.18063,627.42068a27.20481,27.20481,0,0,0,1.849,13.92772,24.79288,24.79288,0,0,0,4.16825-26.62395A27.20511,27.20511,0,0,0,978.18063,627.42068Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><path d="M958.161,645.27624a27.20484,27.20484,0,0,0,14.03685.6061,24.79294,24.79294,0,0,0-25.49041-8.74345A27.205,27.205,0,0,0,958.161,645.27624Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><path d="M957.93488,691.92193a19.06866,19.06866,0,0,0,9.83869.42484,17.37777,17.37777,0,0,0-17.86669-6.12845A19.06838,19.06838,0,0,0,957.93488,691.92193Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><path d="M469.0259,719.30505l-1.77793-.03472a412.33109,412.33109,0,0,1,6.31131-58.927c7.68816-41.67549,20.47226-69.04591,37.99721-81.3508l1.02092,1.455C471.639,609.19135,469.04674,718.20687,469.0259,719.30505Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><path d="M491.25005,718.87967l-1.77793-.03473c.03822-1.96892,1.14943-48.37224,19.41748-61.198l1.02092,1.455C492.37949,671.41028,491.25873,718.40654,491.25005,718.87967Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><circle cx="335.69201" cy="392.21935" r="8.88967" fill="#f1f1f1"/><circle cx="331.28971" cy="468.67043" r="8.88966" fill="#f1f1f1"/><path d="M487.10638,585.938a39.487,39.487,0,0,1-2.68371,20.21562,35.986,35.986,0,0,1-6.05007-38.64376A39.48723,39.48723,0,0,1,487.10638,585.938Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><path d="M516.16415,611.85472a39.48692,39.48692,0,0,1-20.374.87974,35.98608,35.98608,0,0,1,36.99847-12.69082A39.48714,39.48714,0,0,1,516.16415,611.85472Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><path d="M516.4924,679.55937a27.67754,27.67754,0,0,1-14.28053.61664,25.22328,25.22328,0,0,1,25.93291-8.89525A27.67726,27.67726,0,0,1,516.4924,679.55937Z" transform="translate(-187 -179.5)" fill="#f1f1f1"/><path d="M331.67889,340.73408l-4.27749-26.16824L315.324,311.54641s-9.58554-2.95248-11.826,16.35507c-2.24042,19.30769-.50354,55.35612-.50354,55.35612l-26.51674,83.97065a11.72858,11.72858,0,1,0,16.19395,6.98492l34.47824-78.87785Z" transform="translate(-187 -179.5)" fill="#ffb7b7"/><path d="M405.12225,320.14111l-6.34067-25.74625,9.922-7.519s7.65649-6.479,17.29787,10.39832c9.64144,16.87747,22.198,50.71293,22.198,50.71293l57.35734,66.81575a11.72861,11.72861,0,1,1-12.15092,12.78235L430.726,368.57925Z" transform="translate(-187 -179.5)" fill="#ffb7b7"/><polygon points="267.689 526.093 282.072 526.092 288.915 470.614 267.686 470.615 267.689 526.093" fill="#ffb7b7"/><path d="M451.01987,700.89677l28.32581-.00115h.00115a18.05238,18.05238,0,0,1,18.05142,18.05114v.5866l-46.37752.00172Z" transform="translate(-187 -179.5)" fill="#2f2e41"/><polygon points="87.016 526.093 101.399 526.092 108.242 470.614 87.013 470.615 87.016 526.093" fill="#ffb7b7"/><path d="M270.34694,700.89677l28.32581-.00115h.00115a18.05238,18.05238,0,0,1,18.05142,18.05114v.5866l-46.37752.00172Z" transform="translate(-187 -179.5)" fill="#2f2e41"/><circle cx="175.23009" cy="52.43113" r="38.90176" fill="#2f2e41"/><ellipse cx="323.32833" cy="202.41945" rx="16.09728" ry="12.07296" transform="translate(-235.43149 108.41494) rotate(-45)" fill="#2f2e41"/><ellipse cx="387.97281" cy="192.27914" rx="12.07296" ry="16.09728" transform="translate(-128.2553 294.03173) rotate(-66.86956)" fill="#2f2e41"/><circle cx="363.46387" cy="241.21787" r="33.01551" transform="translate(-209.53283 264.93844) rotate(-61.33682)" fill="#ffb7b7"/><path d="M328.77225,220.45121a44.90373,44.90373,0,0,0,25.66215,7.93072,27.51736,27.51736,0,0,1-10.9065,4.487,90.54536,90.54536,0,0,0,36.98491.20781,23.937,23.937,0,0,0,7.74243-2.65919,9.79832,9.79832,0,0,0,4.779-6.39139c.81144-4.63558-2.80066-8.84711-6.55444-11.68544a48.34817,48.34817,0,0,0-40.62844-8.11869c-4.53846,1.17313-9.085,3.15525-12.03283,6.8s-3.82105,9.26372-1.01249,13.01683Z" transform="translate(-187 -179.5)" fill="#2f2e41"/><path d="M346.91765,284.15122l-32.6779,26.687,28.55215,68.079.54464,10.89263s-29.63979,27.328-47.97909,103.66828-55.37958,177.77807-55.37958,177.77807l74.10071,18.12764,51.52065-172.68961,65.6767,135.48025,9.343,40.07162,57.28023-15.90144L475.79244,568.80829,421.5723,401.88576l4.4524-46.11417s9.92186-23.01733-7.31466-47.38628l-5.40649-22.89807L385.317,280.71681Z" transform="translate(-187 -179.5)" fill="#2f2e41"/><path d="M896.41455,526.4292H669.54305a6.84142,6.84142,0,0,1-6.83348-6.83348v-76.535a6.84142,6.84142,0,0,1,6.83348-6.83348h226.8715a6.84131,6.84131,0,0,1,6.83348,6.83348v76.535A6.84131,6.84131,0,0,1,896.41455,526.4292Z" transform="translate(-187 -179.5)" fill="#e5e5e5"/><rect x="511.24366" y="277.22771" width="60.13462" height="6.83348" fill="#fff"/><circle cx="650.64663" cy="281.3278" r="4.10009" fill="#2ecc71"/><circle cx="664.31359" cy="281.3278" r="4.10009" fill="#2ecc71"/><circle cx="677.98055" cy="281.3278" r="4.10009" fill="#2ecc71"/><path d="M896.41455,623.4646H669.54305a6.84142,6.84142,0,0,1-6.83348-6.83348v-76.535a6.84142,6.84142,0,0,1,6.83348-6.83348h226.8715a6.84131,6.84131,0,0,1,6.83348,6.83348v76.535A6.84131,6.84131,0,0,1,896.41455,623.4646Z" transform="translate(-187 -179.5)" fill="#e5e5e5"/><rect x="511.24366" y="374.26311" width="60.13462" height="6.83348" fill="#fff"/><circle cx="650.64663" cy="378.3632" r="4.10009" fill="#2ecc71"/><circle cx="664.31359" cy="378.3632" r="4.10009" fill="#2ecc71"/><circle cx="677.98055" cy="378.3632" r="4.10009" fill="#2ecc71"/><path d="M896.41455,720.5H669.54305a6.84142,6.84142,0,0,1-6.83348-6.83348v-76.535a6.84142,6.84142,0,0,1,6.83348-6.83348h226.8715a6.84131,6.84131,0,0,1,6.83348,6.83348v76.535A6.84131,6.84131,0,0,1,896.41455,720.5Z" transform="translate(-187 -179.5)" fill="#e5e5e5"/><rect x="511.24366" y="471.29851" width="60.13462" height="6.83348" fill="#fff"/><circle cx="650.64663" cy="475.3986" r="4.10009" fill="#2ecc71"/><circle cx="664.31359" cy="475.3986" r="4.10009" fill="#2ecc71"/><circle cx="677.98055" cy="475.3986" r="4.10009" fill="#2ecc71"/><path d="M624.16975,555.4751a51.65758,51.65758,0,0,1-12.80592-1.65653l-.82437-.22809-.76473-.38315c-27.64741-13.86188-50.972-32.17148-69.32613-54.42051A206.01576,206.01576,0,0,1,505.445,436.63119a239.23058,239.23058,0,0,1-13.52819-84.27411c.01166-.60191.02157-1.06666.02157-1.38685,0-13.93921,7.73735-26.16983,19.7117-31.15922,9.1646-3.81859,92.37477-37.99632,98.38691-40.46576,11.3225-5.6733,23.40157-.938,25.33457-.11,4.3358,1.77271,81.25852,33.235,97.88147,41.15044,17.13161,8.15789,21.7025,22.81326,21.7025,30.18661,0,33.38152-5.78132,64.57921-17.18348,92.72653a214.70835,214.70835,0,0,1-38.585,62.18361c-31.49806,35.44645-63.00448,48.01241-63.30855,48.12316A34.42708,34.42708,0,0,1,624.16975,555.4751ZM616.76046,537.122c2.73154.61241,9.02035,1.531,13.11931.03575,5.20719-1.899,31.57753-15.57359,56.21984-43.30474,34.04717-38.315,51.32274-86.48008,51.348-143.15748-.06081-1.14826-.87625-9.338-11.72177-14.50227-16.30062-7.76232-96.25525-40.45566-97.061-40.78518l-.2209-.09365c-1.67557-.70216-7.00808-2.18111-10.68387-.25491l-.736.34312c-.89121.366-89.21978,36.64445-98.64007,40.56951-6.58977,2.74572-8.93768,9.54785-8.93768,14.9981,0,.3983-.0103.97768-.02487,1.72647C508.66861,391.47757,517.64272,486.90515,616.76046,537.122Z" transform="translate(-187 -179.5)" fill="#3f3d56"/><path d="M613.69824,287.305s-89.13138,36.60753-98.68117,40.58661-14.32468,13.52887-14.32468,23.07866S493.53,485.132,613.69824,545.38167c0,0,10.90644,3.01772,19.181,0s113.32231-53.94993,113.32231-194.80934c0,0,0-14.32469-16.71214-22.28285S631.97694,287.305,631.97694,287.305,622.05431,282.928,613.69824,287.305Z" transform="translate(-187 -179.5)" fill="#2ecc71"/><path d="M623.248,315.95433V511.24254s89.9272-43.28737,89.13138-157.089Z" transform="translate(-187 -179.5)" opacity="0.2"/><path d="M1012,720.5H188a1,1,0,0,1,0-2h824a1,1,0,0,1,0,2Z" transform="translate(-187 -179.5)" fill="#cbcbcb"/></svg>`}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Validación del dispositivo</Text>
        {areCredentialsLoaded ? (
          <Text style={styles.subtitle}>Dispositivo validado</Text>
        ) : (
          <View style={styles.button} onTouchEnd={onLogin}>
            <Text style={styles.textButton}>Validar</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  svgcontainer: {
    marginTop: 50,
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#34434d",
  },
  subtitle: {
    fontSize: 20,
    color: "green",
    marginTop: 100,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    paddingStart: 20,
    width: "80%",
    margin: 10,
  },
  containerSVG: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: width,
    backgroundColor: "#2ecc71",
    margin: 0,
    height: height / 4,
  },
  rotateSvg: {
    transform: [{ rotate: "180deg" }],
  },
  button: {
    borderRadius: 20,
    padding: 10,

    backgroundColor: "#2ecc71",
    margin: 100,
    width: "40%",
  },
  textButton: {
    color: "white",
    textAlign: "center",
  },
});
