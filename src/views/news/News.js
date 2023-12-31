import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd'
import _ from 'lodash'
export default function News() {
  const [list, setlist] = useState([])
  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category").then(res => {
      // console.log()
      setlist(Object.entries(_.groupBy(res.data, item => item.category.title)))
    })
  }, [])
  return (
    <div style={{
      width: "95%",
      margin: '0'
    }}>
      <PageHeader
        className="site-page-header"
        title="全球大新闻"
        subTitle="查看新闻"
      />,
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={[16, 16]}>
          {
            list.map(item =>
              <Col span={8} key={item[0]}>
                <Card title={item[0]} bordered={true} hoverable={true}>
                  <List
                    size="small"
                    dataSource={item[1]}
                    pagination={{
                      pageSize: 3
                    }}
                    renderItem={data => <List.Item><a href={`#/detail/${data.id}`}>{data.title}</a></List.Item>} />
                </Card>
              </Col>)
          }
        </Row>
      </div>,
    </div>
  )
}
