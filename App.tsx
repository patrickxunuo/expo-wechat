import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as WeChat from "react-native-wechat-lib";
import { useEffect, useState } from "react";
import {
  registerApp,
  sendAuthRequest,
  openCustomerService,
  shareMiniProgram,
  NativeWechatConstants,
} from "native-wechat";

export default function App() {
  const [installed, setInstalled] = useState(false);
  const [authRes, setAuthRes] = useState("");
  const [shareRes, setShareRes] = useState("");
  const [payRes, setPayRes] = useState("");

  useEffect(() => {
    WeChat.registerApp("wx966bd9afdcce51c1", "");
    WeChat.isWXAppInstalled().then(setInstalled);
    if (registerApp) {
      registerApp({ appid: "wx966bd9afdcce51c1" });
      WeChat.isWXAppInstalled().then(setInstalled);
    }
  }, []);

  const handleAction = async () => {
    await WeChat.openWXApp();
  };

  const handleInvoice = async () => {
    await WeChat.chooseInvoice({
      cardSign: "cardSign",
      signType: "SHA256",
      timeStamp: Date.now(),
      nonceStr: `${Date.now()}`,
    });
  };

  const handleAuth = async () => {
    await sendAuthRequest({
      scope: "snsapi_userinfo",
      state: "expo_wechat_app",
    })
      .then((response) => {
        setAuthRes("response" + response);
      })
      .catch((error) => {
        let errorCode = Number(error.code);
        if (errorCode === -2) {
          setAuthRes("error" + "已取消授权登录");
        } else {
          setAuthRes("error" + "微信授权登录失败");
        }
      });
  };

  const handleShare = async () => {
    await WeChat.shareText({
      text: "123",
      scene: 1,
    });
    setShareRes("shareresstart_" + "_shareresend");
  };

  const handleCustomerService = async () => {
    openCustomerService({
      corpid: "ww154d58427b235a81",
      url: "https://work.weixin.qq.com/kfid/kfc6209c39d27c6d93d",
    });
  };

  const handlePay = async () => {
    const res = await WeChat.pay({
      partnerId: "123",
      prepayId: "123",
      nonceStr: "123",
      timeStamp: "1232",
      package: "123",
      sign: "123",
    });
    setPayRes("payresstart_" + JSON.stringify(res) + "_payresend");
  };

  const handleLaunchMP = async () => {
    await WeChat.launchMiniProgram({
      userName: "gh_d43f693ca31f",
      // miniProgramType: 3,
    });
  };

  const handleShareMiniProgram = async () => {
    console.log("share mini program");
    console.log(WeChat.shareMiniProgram);
    await WeChat.shareMiniProgram({
      title: "Mini program.",
      userName: "gh_d43f693ca31f",
      webpageUrl: "https://google.com/show.html",
      thumbImageUrl: "https://www.google.com/images/errors/robot.png",
    })
      .then((res) => console.log("res", res))
      .catch((error) => console.log("err", error));
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{installed ? "installed" : "not installed"}</Text>
      <Button title="open wechat" onPress={handleAction} />
      <Button title="open wechat auth" onPress={handleAuth} />
      <Text>auth res : {authRes}</Text>
      <Button title="share image" onPress={handleShare} />
      <Text>share res : {shareRes}</Text>
      <Button title="pay" onPress={handlePay} />
      <Text>pay res : {payRes}</Text>
      <StatusBar style="auto" />
      <Button title="choose invoice" onPress={handleInvoice} />
      <Button title="open miniapp" onPress={handleLaunchMP} />
      <Button title="share miniapp" onPress={handleShareMiniProgram} />
      <Button title="open customer service" onPress={handleCustomerService} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
