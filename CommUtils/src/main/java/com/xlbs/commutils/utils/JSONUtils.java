package com.xlbs.commutils.utils;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;
import com.xlbs.commutils.exceptions.JSONException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xielbs
 * @create 2018-04-18 9:37
 * @desc JSON处理工具类
 **/
public class JSONUtils {
	/**
	 * 利用GSON工具包
	 */
	private final static Gson gson = new GsonBuilder().disableHtmlEscaping().create();
	
	private final static Gson gsonUpCase = new GsonBuilder().disableHtmlEscaping().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();

	/**
	 * 解析对象成json字符串
	 * @param obj 对象
	 * @return
	 */
	public static String serialize(Object obj) throws JSONException {
		try {
			return gson.toJson(obj);
		} catch (Exception e) {
			throw new JSONException("json解析出错" + e.getMessage());
		}

	}
	
	/**
	 * 解析对象成json字符串，属性名首字母大写
	 * @param obj 对象
	 * @return
	 */
	public static String serializeUpCase(Object obj) throws JSONException {
		try {
			return gsonUpCase.toJson(obj);
		} catch (Exception e) {
			throw new JSONException("json解析出错" + e.getMessage());
		}

	}

	/**
	 * 解析json成指定对象类型
	 * @param json json字符串
	 * @param className 对象类型
	 * @return
	 */
	public static Object deserialize(String json, Class<?> className)
			throws JSONException {
		try {
			return gson.fromJson(json, className);
		} catch (Exception e) {
			throw new JSONException("json解析出错" + e.getMessage());
		}
	}
	
	/**
	 * 解析json成指定对象类型，属性名首字母大写
	 * @param json json字符串
	 * @param className 对象类型
	 * @return
	 */
	public static Object deserializeUpCase(String json, Class<?> className)
			throws JSONException {
		try {
			return gsonUpCase.fromJson(json, className);
		} catch (Exception e) {
			throw new JSONException("json解析出错" + e.getMessage());
		}
	}
	
	/**
	 * 解析json
	 * @param json
	 * @param t 对象类型转换标示类
	 * @return
	 * @throws JSONException
	 */
	public static <T> T deserialize(String json,ObjectToken<T> t)
			throws JSONException {
		try {
			Gson gson = new GsonBuilder().registerTypeAdapter(t.getType(),new GsonTypeAdapter()).create();
			return gson.fromJson(json, t.getType());
		} catch (Exception e) {
			throw new JSONException("json解析出错" + e.getMessage());
		}
	}

	/**
	 * 解析json
	 * @param json
	 * @param t 对象类型转换标示类，属性名首字母大写
	 * @return
	 * @throws JSONException
	 */
	public static <T> T deserializeUpCase(String json,ObjectToken<T> t)
			throws JSONException {
		try {
			return gsonUpCase.fromJson(json, t.getType());
		} catch (Exception e) {
			throw new JSONException("json解析出错" + e.getMessage());
		}
	}

	/**
	 * 对象类型转换标示类
	 * @author xlbs
	 * @param <T> 具体类型
	 */
	public static class ObjectToken<T> extends TypeToken<T>{
		
	}


	/**
	 * Gson构造器
	 */
	public static class GsonTypeAdapter extends TypeAdapter<Object> {
		@Override
		public Object read(JsonReader in) throws IOException{
			// 反序列化
			JsonToken token = in.peek();
			switch (token){
				case BEGIN_ARRAY:
					List<Object> list = new ArrayList<Object>();
					in.beginArray();
					while (in.hasNext()){
						list.add(read(in));
					}
					in.endArray();
					return list;
				case BEGIN_OBJECT:
					Map<String, Object> map = new HashMap<String, Object>();
					in.beginObject();
					while (in.hasNext()){
						map.put(in.nextName(), read(in));
					}
					in.endObject();
					return map;
				case STRING:
					return in.nextString();
				case NUMBER:
					/**
					 * 改写数字的处理逻辑，将数字值分为整型与浮点型。
					 */
					double dbNum = in.nextDouble();
					// 数字超过long的最大值，返回浮点类型
					if (dbNum > Long.MAX_VALUE){
						return dbNum;
					}
					// 判断数字是否为整数值
					long lngNum = (long) dbNum;
					if (dbNum == lngNum){
						return lngNum;
					} else {
						return dbNum;
					}
				case BOOLEAN:
					return in.nextBoolean();
				case NULL:
					in.nextNull();
					return null;
				default:
					throw new IllegalStateException();
			}
		}

		@Override
		public void write(JsonWriter out, Object value) throws IOException{

		}

	}



	
}
