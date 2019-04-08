package com.xlbs.commutils.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class RandomCodeUtils {

    /**
     * 产生指定位数的随机数字码
     * @param length 位数
     * @return
     */
    public static String getNumberCode(int length){
        StringBuffer sb = new StringBuffer();
        Random random = new Random();
        for(int i=0; i<length; i++){
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    /**
     *  产生指定位数的随机字母,数字组合码
     * @return
     */
    public static String getCharAndNumCode(int length){
        StringBuffer sb = new StringBuffer();
        for (int i=0; i<length; i++){
            sb.append(getCharAndNumCode());
        }
        return sb.toString();
    }

    /***
     * 产生随机字母或数字
     * @return
     */
    private static String getCharAndNumCode(){
        String value = "";
        Random random = new Random();
        int gen = random.nextInt(2);
        String charOrNum = gen%2==0 ? "CHAR":"NUM";
        if("CHAR".equals(charOrNum)){//产生随机字母
            int temp = random.nextInt(2)%2==0 ? 65:97;
            int ascli = random.nextInt(26);
            value = String.valueOf((char)(ascli + temp));
        }else if("NUM".equals(charOrNum)){//产生随机数
            value = String.valueOf(random.nextInt(10));
        }
        return value;
    }


    /**
     * 根据时间产生Id
     * @return
     */
    public static long getRandomId(){
        Date date = new Date();
        String dateStr = new SimpleDateFormat("yyMMddHHmmssSSSS").format(date);
        return Long.valueOf(dateStr).longValue();
    }


}
