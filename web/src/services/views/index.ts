import { api } from '../api';
import { ViewModel } from '../models/panel/types';
import { DeleteRequest, GetRequest } from '../types';

export type FindAllViews = Omit<GetRequest<undefined>, 'path'>;

export type DeleteViewProps = DeleteRequest<{ id: string }>;

class ViewsService {
  public async findAll(props: FindAllViews) {
    const response = await api.get<Omit<{ views: ViewModel[] }, 'core'>>(
      '/views',
      props.config,
    );

    return response.data;
  }

  public async delete(props: DeleteViewProps) {
    console.log('props.path', props.path.id);
    const response = await api.delete<void>(
      `/views/${props.path.id}`,
      props.config,
    );

    return response;
  }
}

export const viewsService = new ViewsService();
