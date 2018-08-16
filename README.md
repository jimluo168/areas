#### 获取省市区 ####

```
@get /areas

@header:
    X-User-Agent:手机信息（必须）
    
    
@return:
    code:int:操作状态
        - 200:操作成功
        - 500:未知错误
    data:array<object>:省市区的信息
        code:string:行政区域代码
        name:string:省份名称
        city:array<object>:省份下的各城市信息
            code:string:行政区域代码
            name:string:城市名称
            area:array<string>:区、县
                code:string:行政区域代码
                name:string:城市名称
    success:bool:是否成功
    msg:string:操作提示

```

**行政区的编码说明：**

`行政区编码采用六位数字 如：北京市为110000`

- 第一、二位表示省(自治区、直辖市、特别行政区)
- 第三、四位表示市(地区、自治州、盟及国家直辖市所属市辖区和县的汇总码)
- 第五、六位表示县(市辖区、县级市、旗)


#### 根据区编码获取街道 ####

```
@get /areas/towns/:code.json

@header:
    X-User-Agent:手机信息（必须）

@params:
    code:string:行政区编码
    
@return:
    code:int:操作状态
        - 200:操作成功
        - 500:未知错误
    data:array<object>:街道的信息
        code:string:行政区域代码
        name:string:街道名称
    success:bool:是否成功
    msg:string:操作提示
    
```