/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cn.js.web.comm;


import com.sun.xml.wss.impl.misc.Base64;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/**
 *
 * @author C0160
 */
public class SmartWeatherUtil {

    private static final String TAG = "SmartWeatherUtil";
    private static final String MAC_NAME = "HmacSHA1";
    private static final String ENCODING = "UTF-8";
    private static final String appid = "fb6859023127d605";
    private static final String private_key = "96d0ca_SmartWeatherAPI_94e651a";
    private static final String url_header = "http://open.weather.com.cn/data/?";

    /**
     * 使用 HMAC-SHA1 签名方法对对encryptText进行签名
     *
     * @param publicKey 被签名的字符串
     * @param privateKey 密钥
     * @return
     * @throws Exception
     */
    private static byte[] HmacSHA1Encrypt(String publicKey, String privateKey)
            throws Exception {
        byte[] privateData = privateKey.getBytes(ENCODING);
        // 根据给定的字节数组构造一个密钥,第二参数指定一个密钥算法的名称  
        SecretKey secretKey = new SecretKeySpec(privateData, MAC_NAME);
        // 生成一个指定 Mac 算法 的 Mac 对象  
        Mac mac = Mac.getInstance(MAC_NAME);
        // 用给定密钥初始化 Mac 对象  
        mac.init(secretKey);
        byte[] publicData = publicKey.getBytes(ENCODING);
        // 完成 Mac 操作  
        return mac.doFinal(publicData);
    }

    /**
     * 获取URL通过privatekey加密后的码
     *
     * @param publicKey
     * @param privateKey
     * @return
     * @throws Exception
     */
    private static String getKey(String publicKey, String privateKey) throws Exception {
        byte[] keyBytes = HmacSHA1Encrypt(publicKey, privateKey);
        String base64encoderStr = Security.base64Encode(keyBytes);
        return URLEncoder.encode(base64encoderStr, ENCODING);
    }

    /**
     * 获得接口的URL地址
     *
     * @param areaid
     * @param type
     * @param date
     * @return
     * @throws Exception
     */
    private static String getInterfaceURL(String areaid, String type, String date) throws Exception {
        String public_key = url_header + "areaid=" + areaid + "&type=" + type + "&date=" + date + "&appid=";
        String key = getKey(public_key + appid , private_key);
        String appid6 = appid.substring(0, 6);
        return public_key + appid6 + "&key=" + key;
    }

    public static String getInterfaceURL(String areaid, String type) throws Exception {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddhhmm");
        String date = dateFormat.format(new Date());
        try {
            return getInterfaceURL(areaid, type, date);
        } catch (Exception e) {
           throw e;
        }
    }

}
