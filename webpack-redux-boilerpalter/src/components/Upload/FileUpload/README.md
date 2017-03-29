# 文件上传
***
该组件为 [React-FileUpload](https://github.com/SoAanyip/React-FileUpload) 组件的封装。
## Usage
``` javascript
import FileUpload from '../../components/FileUpload';

class UploadDemo extends React.Component {

    ...

    render () {

        const files = [
            {
                id: 201,
                fileIconUrl: '... doc.png',
                name: '我是有趣的文件名，我很傲娇',
            },
            {
                id: 202,
                fileIconUrl: '... doc.png',
                name: '我是有趣的文件名，我很傲娇',
            },
        ];

        return (
            <div>
                <FileUpload files={files}></FileUpload>
            </div>
        );
    }
}

export default UploadDemo;

```
*** 属性 ***

字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
baseUrl | string | ``''`` | 目标域名
param | object | ``{}`` | 作为get参数配置在域名之后
paramAddToField | object/func | ``undefined`` | 添加到formData上的参数键值对。func时取返回值。
accept | string | ``''`` | 限制选择文件的类型（后缀）
fileFieldName | string/func | false | 文件添加到formData时，默认用file.name作为key。传入string会直接使用此string作为key，若为func则取返回值，func的参数为对应的file对象。
