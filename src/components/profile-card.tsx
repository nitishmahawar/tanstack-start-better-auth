import { useRouteContext } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

export const ProfileCard = () => {
  const { user } = useRouteContext({ from: '/' })

  if (!user) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No user data available</p>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl">{user.name || 'Unknown User'}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Email Status</span>
          <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
            {user.emailVerified ? 'Verified' : 'Not Verified'}
          </Badge>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">User ID</span>
            <span className="text-muted-foreground font-mono text-xs">
              {user.id.slice(0, 8)}...{user.id.slice(-6)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Member Since</span>
            <span className="text-sm text-muted-foreground">
              {formatDate(user.createdAt)}
            </span>
          </div>

          {user.updatedAt !== user.createdAt && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-muted-foreground">
                {formatDate(user.updatedAt)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
