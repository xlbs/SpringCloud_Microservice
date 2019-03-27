package com.xlbs.excelservice.datasource;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

@Configuration
//扫描mysql mapper接口包名
@MapperScan(basePackages = DataSourceConstants.MYSQL_SCAN_PACKAGE, sqlSessionFactoryRef = DataSourceConstants.MYSQL_SESSION_FACTORY)
/**
 * 采用阿里druid连接池
 */
public class MySQLDataSource {

    @Value("${mysql.datasource.url}")
    private String dbUrl;

    @Value("${mysql.datasource.username}")
    private String dbUser;

    @Value("${mysql.datasource.password}")
    private String dbPassword;
    
    @Qualifier(DataSourceConstants.MYSQL_DATA_SOURCE)
    @Bean(name = DataSourceConstants.MYSQL_DATA_SOURCE)
    @Primary //必须指定一个默认数据源（主数据源）
    public DataSource initMmsDataSource() {
    	DruidDataSource dataSource = new DruidDataSource();
    	dataSource.setUrl(dbUrl);
        dataSource.setUsername(dbUser);
        dataSource.setPassword(dbPassword);
        return dataSource;
    }

    @Bean(name =DataSourceConstants.MYSQL_TX_MG)
    @Primary //必须指定一个默认数据源（主数据源）
    public DataSourceTransactionManager initFtpTransactionManager(@Qualifier(DataSourceConstants.MYSQL_DATA_SOURCE) DataSource mysqlDataSource) {
        return new DataSourceTransactionManager(mysqlDataSource);
    }

    @Bean(name = DataSourceConstants.MYSQL_SESSION_FACTORY)
    @Primary //必须指定一个默认数据源（主数据源）
    public SqlSessionFactory initMmsSessionFactory(@Qualifier(DataSourceConstants.MYSQL_DATA_SOURCE) DataSource mysqlDataSource) throws Exception {
        final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(mysqlDataSource);
        //绑定mysql mybatis映射文件路径
        sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(DataSourceConstants.MYSQL_SCAN_MAPPER));
        return sessionFactory.getObject();
    }
}
