import React, { Component } from 'react';
import Tree, { TreeNode } from 'rc-tree';
import cssAnimation from 'css-animation';
import '../../static/style/tree/tree.css';

function animate(node, show, done) {
  let height = node.offsetHeight;
  return cssAnimation(node, 'collapse', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
      } else {
        height = node.offsetHeight;
        node.style.height = 0;
      }
    },
    active() {
      node.style.height = `${show ? height : 0}px`;
    },
    end() {
      node.style.height = '';
      done();
    },
  });
}

const animation = {
  enter(node, done) {
    return animate(node, true, done);
  },
  leave(node, done) {
    return animate(node, false, done);
  },
  appear(node, done) {
    return animate(node, true, done);
  },
};


function getNewTreeData(treeData, curKey, child) {
  const loop = (data) => {
    data.forEach(item => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
}

/** 返回TreeNode */
function loop(data) {
  return data.map((item) => {
    if (item.children) {
      return (
        <TreeNode
          title={item.name}
          key={item.key}
        >
          {loop(item.children)}
        </TreeNode>);
    };
    return (
      <TreeNode
        title={item.name}
        key={item.key}
        isLeaf={item.isLeaf}
      />
    );
  });
};

/** 数据预处理 */
function filter(nodes) {
  const loopChildren = (child) => {
    if(child && child.length) {
      child.forEach(item => {
        if (child.children) {
          loopChildren(item.children);
        } else {
          item.key = item.id;
        };
      });
    } else {
      child = []
    };
    return child;
  };
  nodes.forEach(item => {
    if (item.children && item.children.length) {
      item.children = loopChildren(item.children);
    }
    item.key = item.id;
  });
  return nodes;
}

class Ztree extends Component{
  constructor(props){
    super(props);
    const { setting, treeData, expandedKeys, checkedKeys, selectedKeys } = this.props;
    const getUrl = setting.url.indexOf('?') === -1 ? (setting.url +'?') : (setting.url +'&');
    this.url = getUrl + (setting.param ? (setting.param +'=') : 'pid=');
    this.state = {
      treeData: treeData || [],
      checkedKeys: checkedKeys || [],
      selectedKeys: selectedKeys || [],
      expandedKeys: expandedKeys || []
    };
    this.selectedKeys = selectedKeys || [];
    this.checkedKeys = checkedKeys || [];
    this.onExpand = this.onExpand.bind(this);
    this.cancel = this.cancel.bind(this);
    this.reChecked = this.reChecked.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onLoadData = this.onLoadData.bind(this);
  };
  componentDidMount() {
    const { defaultEvent } = this.props;
    if (!this.state.treeData.length) {
      fetch(this.url)
      .then(response => response.json())
      .then( data => {
        const treeData = data[0].obj; /////////////TODO
        const treeNodes = filter(treeData);
        this.setState({
          treeData: treeNodes,
          expandedKeys: [treeData[0].id.toString()]
        });
        defaultEvent && defaultEvent([treeData[0].id]);
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      defaultEvent && defaultEvent([this.state.treeData[0].id]);
    };
  };
  componentWillReceiveProps(nextState) {
    const { selectedKeys, checkedKeys } = nextState;
    if (selectedKeys && selectedKeys.length) {
      this.setState({
        selectedKeys: selectedKeys
      });
    };
    if (checkedKeys && checkedKeys.length) {
      this.setState({
        checkedKeys: checkedKeys
      });
    };
  };
  onExpand(expandedKeys) {
    this.setState({
      expandedKeys
    });
  };
  cancel() {
    this.setState({
      selectedKeys: [],
      checkedKeys: []
    });
  };
  reChecked(array) {
    this.setState({
      selectedKeys: array,
      checkedKeys: array
    });
  };
  onSelect(info, e) {
    if (info.length) {
      this.selectedKeys = info;
    };
    this.setState({
      checkedKeys: this.selectedKeys,
      selectedKeys: this.selectedKeys
    });
    this.props.onClick && this.props.onClick(this.selectedKeys, e);
  };
  onCheck(checkedKeys, e) {
    const checkedKey = this.props.radio ? [checkedKeys.pop()] : checkedKeys
    this.setState({
      checkedKeys: checkedKey,
      selectedKeys: checkedKey
    });
    this.checkedKeys = [];
    e.checkedNodes.forEach(item => {
      this.checkedKeys.push({
        id: item.key,
        name: item.props.title
      });
    });
    this.props.onCheck && this.props.onCheck(checkedKeys, e);
  };
  onLoadData(treeNode) {
    return new Promise((resolve) => {
      const treeData = [...this.state.treeData];
      const _this = treeNode.props;
      if (_this.children && _this.children.length) {
        resolve();
        return;
      };
      fetch(this.url + _this.eventKey)
      .then(response => response.json())
      .then( data => {
        const treeNode = data[0].obj; /////////////TODO
        getNewTreeData(treeData, _this.eventKey, filter(treeNode));
        this.setState({ treeData });
        resolve();
      })
      .catch(error => {
        console.log(error);
      });
    });
  };
  render() {
    const { className, showIcon, selectable, multiple, checkable, checkStrictly, draggable } = this.props;
    const { selectedKeys, checkedKeys, expandedKeys } = this.state;
    const treeNodes = loop(this.state.treeData);
    if (!treeNodes.length) {
      return <div>加载中…</div>
    };
    return(
      <Tree
        className={className || ''}
        showIcon={showIcon === false ? false : true}
        selectable={selectable === false ? false : true}
        multiple={multiple || false}
        autoExpandParent={false}
        expandedKeys={expandedKeys}
        checkable={checkable || false}
        checkedKeys={checkedKeys}
        checkStrictly={checkStrictly || false}
        selectedKeys={selectedKeys}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        onSelect={this.onSelect}
        loadData={this.onLoadData}
        draggable={draggable || false}
        openAnimation={animation}
      >
        {treeNodes}
      </Tree>
    );
  };
};

export default Ztree;
