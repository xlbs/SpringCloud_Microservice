package com.xlbs.commutils.exceptions;

/**
 * @author xielbs
 * @create 2018-04-18 9:37
 * @desc JSON异常类
 **/
public class JSONException extends Exception{

	private static final long serialVersionUID = 1L;

	public JSONException() {

	}

	/**
	 * @param message
	 */
	public JSONException(String message) {
		super(message);
	}

	/**
	 * @param cause
	 */
	public JSONException(Throwable cause) {
		super(cause);
	}

	/**
	 * @param message
	 * @param cause
	 */
	public JSONException(String message, Throwable cause) {
		super(message, cause);
	}

}
