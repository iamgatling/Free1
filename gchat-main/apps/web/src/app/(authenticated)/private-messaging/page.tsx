'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Input,
  Button,
  List,
  Avatar,
  Row,
  Col,
  Card,
  Badge,
  Space,
  Modal,
} from 'antd'
import {
  SearchOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  MessageOutlined,
  BlockOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PrivateMessagingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [users, setUsers] = useState<Model.User[]>([])
  const [contacts, setContacts] = useState<Model.User[]>([])
  const [messages, setMessages] = useState<Model.PrivateMessage[]>([])
  const [selectedUser, setSelectedUser] = useState<Model.User | null>(null)
  const [messageContent, setMessageContent] = useState<string>('')

  useEffect(() => {
    if (userId) {
      fetchContacts()
      fetchMessages()
    }
  }, [userId])

  const fetchContacts = async () => {
    try {
      const contactsData = await Api.Contact.findManyByUserId(userId, {
        includes: ['contact'],
      })
      setContacts(contactsData.map(contact => contact.contact))
    } catch (error) {
      enqueueSnackbar('Failed to fetch contacts', { variant: 'error' })
    }
  }

  const fetchMessages = async () => {
    try {
      const messagesData = await Api.PrivateMessage.findManyByReceiverId(
        userId,
        { includes: ['sender'] },
      )
      setMessages(messagesData)
    } catch (error) {
      enqueueSnackbar('Failed to fetch messages', { variant: 'error' })
    }
  }

  const handleSearch = async (value: string) => {
    try {
      const usersData = await Api.User.findMany({
        filters: { name: { ilike: `%${value}%` } },
      })
      setUsers(usersData)
    } catch (error) {
      enqueueSnackbar('Failed to search users', { variant: 'error' })
    }
  }

  const handleSendMessage = async () => {
    if (!selectedUser || !messageContent.trim()) return

    try {
      await Api.PrivateMessage.createOneBySenderId(userId, {
        message: messageContent,
        timestamp: dayjs().toISOString(),
        isDeleted: false,
        receiverId: selectedUser.id,
      })
      setMessageContent('')
      fetchMessages()
      enqueueSnackbar('Message sent', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  const handleAddContact = async (contactId: string) => {
    try {
      await Api.Contact.createOneByUserId(userId, { contactId })
      fetchContacts()
      enqueueSnackbar('Contact added', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add contact', { variant: 'error' })
    }
  }

  const handleBlockUser = async (blockedId: string) => {
    try {
      await Api.Block.createOneByBlockerId(userId, { blockedId })
      enqueueSnackbar('User blocked', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to block user', { variant: 'error' })
    }
  }

  const handleReportUser = async (reportedUserId: string) => {
    try {
      await Api.Report.createOneByReporterId(userId, {
        reason: 'Inappropriate behavior',
        timestamp: dayjs().toISOString(),
        reportedUserId,
        reportedMessageId: '',
      })
      enqueueSnackbar('User reported', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to report user', { variant: 'error' })
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await Api.PrivateMessage.updateOne(messageId, { isDeleted: true })
      fetchMessages()
      enqueueSnackbar('Message deleted', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete message', { variant: 'error' })
    }
  }

  const showConfirm = (
    userId: string,
    action: () => void,
    title: string,
    content: string,
  ) => {
    Modal.confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      onOk: action,
      onCancel() {},
    })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Private Messaging</Title>
      <Paragraph>
        Send and receive private messages, manage contacts, and ensure a safe
        environment.
      </Paragraph>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Search Users">
            <Input.Search
              placeholder="Search for users"
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
            />
            <List
              itemLayout="horizontal"
              dataSource={users}
              renderItem={user => (
                <List.Item
                  actions={[
                    <Button
                      icon={<UserAddOutlined />}
                      onClick={() => handleAddContact(user.id)}
                    />,
                    <Button
                      icon={<BlockOutlined />}
                      onClick={() =>
                        showConfirm(
                          user.id,
                          () => handleBlockUser(user.id),
                          'Block User',
                          'Are you sure you want to block this user?',
                        )
                      }
                    />,
                    <Button
                      icon={<ExclamationCircleOutlined />}
                      onClick={() =>
                        showConfirm(
                          user.id,
                          () => handleReportUser(user.id),
                          'Report User',
                          'Are you sure you want to report this user?',
                        )
                      }
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={user.pictureUrl} />}
                    title={user.name}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Contacts">
            <List
              itemLayout="horizontal"
              dataSource={contacts}
              renderItem={contact => (
                <List.Item
                  actions={[
                    <Button
                      icon={<MessageOutlined />}
                      onClick={() => setSelectedUser(contact)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={contact.pictureUrl} />}
                    title={contact.name}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Messages">
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={message => (
                <List.Item
                  actions={[
                    <Button
                      icon={<UserDeleteOutlined />}
                      onClick={() =>
                        showConfirm(
                          message.id,
                          () => handleDeleteMessage(message.id),
                          'Delete Message',
                          'Are you sure you want to delete this message?',
                        )
                      }
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={message.sender?.pictureUrl} />}
                    title={message.sender?.name}
                    description={message.message}
                  />
                  <Text type="secondary">
                    {dayjs(message.timestamp).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </List.Item>
              )}
            />
          </Card>
          {selectedUser && (
            <Card title={`Chat with ${selectedUser.name}`}>
              <TextArea
                rows={4}
                value={messageContent}
                onChange={e => setMessageContent(e.target.value)}
              />
              <Button
                type="primary"
                onClick={handleSendMessage}
                style={{ marginTop: 8 }}
              >
                Send
              </Button>
            </Card>
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}
