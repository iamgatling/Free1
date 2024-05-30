'use client'

import { useEffect, useState } from 'react'
import { Typography, Input, Button, List, Avatar, Row, Col, Space } from 'antd'
import {
  SendOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [messages, setMessages] = useState<Model.WorldChatMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [friendRequests, setFriendRequests] = useState<Model.FriendRequest[]>(
    [],
  )

  useEffect(() => {
    if (userId) {
      Api.WorldChatMessage.findMany({ includes: ['user'] })
        .then(setMessages)
        .catch(() =>
          enqueueSnackbar('Failed to load messages', { variant: 'error' }),
        )

      Api.FriendRequest.findManyByReceiverId(userId, { includes: ['sender'] })
        .then(setFriendRequests)
        .catch(() =>
          enqueueSnackbar('Failed to load friend requests', {
            variant: 'error',
          }),
        )
    }
  }, [userId])

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return

    try {
      const message = await Api.WorldChatMessage.createOneByUserId(userId, {
        message: newMessage,
        timestamp: dayjs().toISOString(),
      })
      setMessages([...messages, message])
      setNewMessage('')
      enqueueSnackbar('Message sent', { variant: 'success' })
    } catch {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  const handleLeaveChat = () => {
    router.push('/home')
  }

  const handleAddFriend = async (senderId: string) => {
    try {
      await Api.FriendRequest.createOneBySenderId(userId, {
        status: 'accepted',
        timestamp: dayjs().toISOString(),
        receiverId: senderId,
      })
      enqueueSnackbar('Friend request accepted', { variant: 'success' })
      setFriendRequests(
        friendRequests.filter(request => request.senderId !== senderId),
      )
    } catch {
      enqueueSnackbar('Failed to accept friend request', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>World Chat</Title>
      <Text>Communicate with everyone in the world chat.</Text>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={16}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.user?.pictureUrl} />}
                  title={item.user?.name}
                  description={item.message}
                />
                <Text type="secondary">
                  {dayjs(item.timestamp).format('HH:mm DD/MM/YYYY')}
                </Text>
              </List.Item>
            )}
          />
          <Space direction="vertical" style={{ width: '100%' }}>
            <TextArea
              rows={4}
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
            >
              Send Message
            </Button>
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={handleLeaveChat}
            >
              Leave Chat
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Title level={4}>Friend Requests</Title>
          <List
            itemLayout="horizontal"
            dataSource={friendRequests}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={() => handleAddFriend(item.senderId)}
                  >
                    Accept
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.sender?.pictureUrl} />}
                  title={item.sender?.name}
                  description={`Sent at ${dayjs(item.timestamp).format('HH:mm DD/MM/YYYY')}`}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </PageLayout>
  )
}
