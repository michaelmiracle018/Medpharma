import {cva, type VariantProps} from 'class-variance-authority'
import type {LucideIcon} from 'lucide-react-native'
import * as React from 'react'
import {View, type ViewProps} from 'react-native'
import {cn} from '../../lib/utils'
import {Text} from './text'

const alertVariants = cva(
  'relative bg-background w-full rounded-lg border border-border p-3 shadow shadow-foreground/10',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive',
        warning: 'border-yellow-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps &
    VariantProps<typeof alertVariants> & {
      icon?: LucideIcon
      iconSize?: number
      iconClassName?: string
      iconColor?: string
    }
>(
  (
    {
      className,
      variant,
      children,
      icon: Icon,
      iconSize = 16,
      iconClassName,
      iconColor,
      ...props
    },
    ref,
  ) => {
    // const { colors } = useTheme();
    return (
      <View
        ref={ref}
        role="alert"
        className={alertVariants({variant, className})}
        {...props}>
        {children}
      </View>
    )
  },
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({className, ...props}, ref) => (
  <Text
    ref={ref}
    className={cn(
      'mb-1 font-medium text-base leading-none tracking-tight text-foreground',
      className,
    )}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({className, ...props}, ref) => (
  <Text
    ref={ref}
    className={cn('text-sm leading-relaxed text-foreground', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export {Alert, AlertDescription, AlertTitle}
