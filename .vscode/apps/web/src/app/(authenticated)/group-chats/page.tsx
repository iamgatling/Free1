'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Button,
  Modal,
  Form,
  Input,
  List,
  Avatar,
  Space,
} from 'antd'
import {
  PlusOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function GroupChatsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [groupChats, setGroupChats] = useState<Model.GroupChat[]>([])
  const [selectedGroupChat, setSelectedGroupChat] =
    useState<Model.GroupChat | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [inviteForm] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchGroupChats()
    }
  }, [userId])

  const fetchGroupChats = async () => {
    try {
      const groupChatsFound = await Api.GroupChat.findMany({
        includes: ['creator', 'groupChatMembers', 'groupChatMessages'],
      })
      setGroupChats(groupChatsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch group chats', { variant: 'error' })
    }
  }

  const handleCreateGroupChat = async (values: { name: string }) => {
    try {
      const newGroupChat = await Api.GroupChat.createOneByCreatorId(userId!, {
        name: values.name,
        timestamp: dayjs().toISOString(),
      })
      setGroupChats([...groupChats, newGroupChat])
      setIsModalVisible(false)
      form.resetFields()
      enqueueSnackbar('Group chat created successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to create group chat', { variant: 'error' })
    }
  }

  const handleInviteUser = async (values: { email: string }) => {
    try {
      const users = await Api.User.findMany({
        filters: { email: values.email },
      })
      if (users.length === 0) {
        enqueueSnackbar('User not found', { variant: 'error' })
        return
      }
      const userToInvite = users[0]
      const newGroupChatMember =
        await Api.GroupChatMember.createOneByGroupChatId(
          selectedGroupChat!.id,
          { userId: userToInvite.id },
        )
      setSelectedGroupChat({
        ...selectedGroupChat!,
        groupChatMembers: [
          ...selectedGroupChat!.groupChatMembers!,
          newGroupChatMember,
        ],
      })
      setIsInviteModalVisible(false)
      inviteForm.resetFields()
      enqueueSnackbar('User invited successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to invite user', { variant: 'error' })
    }
  }

  const handleLeaveGroupChat = async (groupChatId: string) => {
    try {
      const groupChatMember = await Api.GroupChatMember.findManyByUserId(
        userId!,
        {
          filters: { groupChatId },
        },
      )
      if (groupChatMember.length > 0) {
        await Api.GroupChatMember.deleteOne(groupChatMember[0].id)
        setGroupChats(groupChats.filter(chat => chat.id !== groupChatId))
        enqueueSnackbar('Left group chat successfully', { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar('Failed to leave group chat', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Group Chats</Title>
      <Text>
        Manage your group chats, invite users, and leave conversations.
      </Text>
      <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Create Group Chat
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={groupChats}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<UserAddOutlined />}
                  onClick={() => {
                    setSelectedGroupChat(item)
                    setIsInviteModalVisible(true)
                  }}
                >
                  Invite
                </Button>,
                <Button
                  type="link"
                  icon={<LogoutOutlined />}
                  onClick={() => handleLeaveGroupChat(item.id)}
                >
                  Leave
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.creator?.pictureUrl} />}
                title={item.name}
                description={`Created by ${item.creator?.name} on ${dayjs(item.timestamp).format('MMMM D, YYYY')}`}
              />
            </List.Item>
          )}
        />
      </Space>

      <Modal
        title="Create Group Chat"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreateGroupChat}>
          <Form.Item
            name="name"
            label="Group Chat Name"
            rules={[
              { required: true, message: 'Please enter the group chat name' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Invite User"
        visible={isInviteModalVisible}
        onCancel={() => setIsInviteModalVisible(false)}
        onOk={() => inviteForm.submit()}
      >
        <Form form={inviteForm} onFinish={handleInviteUser}>
          <Form.Item
            name="email"
            label="User Email"
            rules={[{ required: true, message: 'Please enter the user email' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
