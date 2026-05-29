import BlockCanvas from '@/components/BlockCanvas'

export default function DecorativeGraphic() {
  return (
    <div className="w-full mt-32 lg:mt-64" style={{ aspectRatio: '1512 / 453' }}>
      <BlockCanvas style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
